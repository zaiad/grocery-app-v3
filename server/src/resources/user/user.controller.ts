import UserModel from "./user.model";
import { createError } from "../../utils/error/custom.error";
import UserService from "./user.service";
import { Request, Response, NextFunction } from "express";

class UserController {
    private UserService = new UserService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const loginResult = await this.UserService.login(email, password, next);

            if (typeof loginResult === "object" && "acces_token" in loginResult) {
                const { acces_token, refresh_token } = loginResult;
                return res.status(200).json({ acces_token, refresh_token });
            }
        } catch (error) {
            return next(error);
        }
    };

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await this.UserService.register(name, email, password, next);

            if (!newUser) {
                return next(createError("Could not register user, please try again", 400));
            }

            res.status(201).json({ success: true });
        } catch (error) {
            return next(error);
        }
    };

    public verifyAccount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { otp, email } = req.body;
            const user = await this.UserService.verifyOtp(email, otp, next);

            if (!user) {
                return next(createError("Invalid OTP", 400));
            }

            return res.status(200).json({ message: "You account is activated" });
        } catch (error) {
            return next(error);
        }
    };
}

export default UserController;
