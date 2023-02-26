import { Token } from './../../utils/interface/jwt.interface';
import { sendConfirmationEmail } from "../../utils/otp/send.otp.code";
import { generateOTP } from "../../utils/otp/generate.otp";
import accesToken from "../../utils/token/generate.acces.token";
import { createError } from "../../utils/error/custom.error";
import { NextFunction, Request, Response } from "express";
import UserModel from "./user.model";
import bcrypt from "bcryptjs";
import refreshToken from "../../utils/token/generate.refresh.token";


class UserService {
    private User = UserModel;

    public async login(
        email: string,
        password: string,
        next: NextFunction
    ): Promise<Token | void> {
        try {
            const user = await this.User.findOne({ email });
            if (!user)
                return next(
                    createError("Unable to find user with that email address", 401)
                );
            if (!user.isVerified)
                return next(createError("User account is not verified", 401));

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return next(createError("Wrong Password", 401));

            const acces_token = accesToken(user);
            const refresh_token = refreshToken(user);

            user.refresh_token = refresh_token
            
            await user.save();

            return { acces_token, refresh_token } as Token;
        } catch (error) {
            return next(error);
        }
    }

    public async register(
        name: string,
        email: string,
        password: string,
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            const existingUser = await this.User.findOne({ email });
            if (existingUser) {
                return next(createError("Email already exists", 409));
            }


            const otp = generateOTP();
            const hachedPassword = await bcrypt.hash(password, 10);

            const user = await this.User.create({
                name,
                email,
                password: hachedPassword,
                otp,
                isVerified: false,
            });


            await sendConfirmationEmail(name, email, otp, next);

            return true;
        } catch (error) {
            return next(error);
        }
    }

    public verifyOtp = async (
        email: string,
        otp: string,
        next: NextFunction
    ) => {
        try {
            const user = await this.User.findOne({ email });
            if (!user) return next(createError("User not found", 401));

            if (+user.otp != +otp) return false;

            user.isVerified = true;
            user.refresh_token = refreshToken(user);
            
            await user.save();

            return true;
        } catch (error) {
            next(error);
        }
    };
}

export default UserService;
