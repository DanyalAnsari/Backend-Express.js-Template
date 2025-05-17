import express from "express";
import { config } from "dotenv";
config({path:'./config/development.env'})


const app = express();

export default app;