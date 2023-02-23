import { Request, Response, NextFunction } from "express";
import { createError } from "../../utils/error/custom.error";
import accesToken from "../../utils/token/generate.refresh.token";
import * as jwt from "jsonwebtoken";
import userModel from "../../resources/user/user.model";
import { JWTPayload } from './../../utils/interface/token.interface';




const verifyRefreshToken = async (
    req: Request & { cookies?: { [key: string]: string } },
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const refreshToken:any = req.header("Authorization")?.split(" ")[1];
        if (!refreshToken) return next(createError('Refresh token is required', 405));

        if (!refreshToken) return next(createError("Refresh Token Not Found", 405));
    

        const user = await userModel.findOne({ refresh_token: refreshToken });
    
        if (!user) return next(createError("Refresh Token dosen't match", 405));

     

        jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as JWTPayload;
        const newAccessToken = accesToken(user);

        res.status(200).json({ new_acces_token: newAccessToken });
        next()
    } catch (error) {
        next(error);
    }
};


export default verifyRefreshToken;
