import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            usernameAdmin: string,
            username: string,
        }
    }
}

export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {

    const authenticated = req.cookies["authenticated"];
    let verifyToken;

}