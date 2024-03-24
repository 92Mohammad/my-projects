import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

const auth =  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader){
        return res.status(401).json({error: "Missing auth header"})
    }
   jwt.verify(authHeader, process.env.JWT_SECRET!, (err, payload) => {
       if (err || !payload){
           return res.status(403).json({
               error: err
           })
       }
       if (typeof payload === "string") {
           return res.status(403).json({error: 'type miss match'})
       }
       req.headers["userId"] = payload.userId;
       next();
   })
}

export default auth;