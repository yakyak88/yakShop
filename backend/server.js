import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleWare/errorMiddleWare.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import UsersRoutes from "./routes/UsersRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/products", ProductRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/orders", OrderRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(
    PORT,
    console.log(
        `server is running in ${process.env.NODE_ENV} environment on port ${PORT})`
    )
);
