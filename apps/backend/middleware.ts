import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const auth = req.headers["authorization"];
    const token = auth?.split(" ")[1];

    try{

        const decoded = jwt.decode(token, process.env.CLERK_AUTH_JWT);
        
        if(decoded?.sub){
            req.userId = decoded.sub;
            next();
        }

    }catch(e){
        res.status(404).json({
            message: "Authorization Error"
        })
    }
}