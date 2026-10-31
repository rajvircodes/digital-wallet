import { pool } from "../config/database.js";
export async function checkDatabaseConnection():Promise<Boolean>{
    try {
        await pool.query("SELECT 1");

        return true
    } catch (error) {
         console.error("Database health check failed:", error);
        return false
    }
}