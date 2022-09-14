import products from "./data/products.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import users from "./data/users.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
