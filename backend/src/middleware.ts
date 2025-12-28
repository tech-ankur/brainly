import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from './config.js';

export const userauth = (req: Request, res: Response, next: NextFunction) => {
    // 1. Extract the header
    const token = req.headers["authorization"];
    
   

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // 3. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        if (decoded && decoded.userId) {
            // 4. Attach userId to the request
            // See the "TypeScript Tip" below to avoid @ts-ignore
            (req as any).userId = decoded.userId;
            return next();
        } 
        
        return res.status(403).json({ message: "Invalid token payload" });

    } catch (error) {
        // 5. Handle expired or malformed tokens
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};