import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";

export const errorHandler:ErrorRequestHandler = (
    err,
    _req,
    res,
    _next
) =>{
    console.log(err);
    
    res.status(500).json({
        status:"error",
        message:
            env.NODE_ENV === "production"
            ? "Internal server error"
            : err instanceof Error
            ? err.message
            : "Internal server error",
        
    });
};