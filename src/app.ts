import express from "express"
import { errorHandler } from "./middleware/error-handler.js"
import { checkDatabaseConnection } from "./utils/database-health.js"
import { dirxml, timeStamp } from "node:console"

const app = express()

app.use(express.json())

app.get('/health', (_req, res)=>{
    res.status(200).json({
        status:"Success",
        message:"Digital wallet API is healthy!",
        timeStamp: new Date().toISOString(),

    });
});


app.get('/health/database', async (_req, res)=>{
    const isDatabaseHealthy = await checkDatabaseConnection();

    if (!isDatabaseHealthy){
        res.status(503).json({
            status:"error",
            message:"Database connection is unavailable",

        });
        return;

    }

    res.status(200).json({
        status:"success",
        message:"Database connection is healthy",
    });
});

app.use((_req, res)=>{
    res.status(404).json({
        status:"error",
        message:"Route not found",
    });
});


app.use(errorHandler)

export default app