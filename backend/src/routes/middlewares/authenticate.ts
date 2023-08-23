import { NextFunction, Request, Response } from "express";
import  jwt from "jsonwebtoken";

interface TokenPayload{
    userId: string;
    iat: number;
    exp: number;
}

export default function authenticate(
    req: Request, res: Response, next: NextFunction) {
    
        const { authorization} = req.headers;
        
        

        if (!authorization){

            return res.sendStatus(403);
        }

        const token = authorization.replace('Bearer', '').trim();
        

        try {
            const data = jwt.verify(token,'secret'); 
            
    
            const { userId } = data as TokenPayload;
            

            req.userId = userId;

            return next();
            
        } catch  {
            return res.sendStatus(403);
        }
}
