import "dotenv/config"
import process from "node:process";
import {z} from "zod"

const envSchema = z.object({
    NODE_ENV:z
    .enum(["development","production","test"])
    .default("development"),

    PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(5000)
});

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success){
    console.error("Invalid environment configuration:");
    console.error(parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
    
} 

export const env = parsedEnv.data;