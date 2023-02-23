import { JWTPayload } from './../../utils/interface/token.interface';
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "./../../utils/error/custom.error";


const verifyAccessToken = (req: Request & { user?: JWTPayload }, res: Response, next: NextFunction): void => {
    try {
        const token:any = req.header("Authorization")?.split(" ")[1];
        if (!token) return next(createError('Access token is required', 401));
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JWTPayload;

        req.user = decoded;

        res.status(200).json({isValid:true})
        next()
    } catch (error) {
        return next(createError('Invalid Access token', 403))
    }
};

export default verifyAccessToken;
