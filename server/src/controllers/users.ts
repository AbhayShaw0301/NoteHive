import bcrypt from "bcrypt";
import e, { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const authenticatedUser = req.session.userId;
    if (!authenticatedUser) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUser)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing!! ");
    }
    const existingUsername = await UserModel.findOne({
      username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please use a different username ."
      );
    }
    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        "409",
        "User with this email already exists. Please login instead."
      );
    }
    const hashedPassword = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    req.session.userId = newUser._id;
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing!!");
    }
    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid Credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid Credentials.");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
