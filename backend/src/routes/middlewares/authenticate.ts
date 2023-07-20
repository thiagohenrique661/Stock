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
    if (!authenticated) {
        return res.status(401).json({ status: "Invalid credentials", route: "/" });
    }

    const token = process.env.JWT_TOKEN as string;

    try {

        verifyToken = <JwtPayload>Jwt.verify(String(authenticated), token);
        req.usernameAdmin = verifyToken["usernameParent"];
    } catch (error) {

        return res.status(422).json({ status: "Invalid credentials", route: "/" });
    }

    next();
};