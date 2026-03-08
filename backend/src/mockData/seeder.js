const dotenv = require("dotenv");
const fs = require("fs");
const { Product, Category, SubCategory, Brand } = require("../models/index");
require("colors");

dotenv.config({ path: "../../.env" });
const connectDB = require("../config/database");

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"), "utf-8");
const category = JSON.parse(fs.readFileSync("./category.json"), "utf-8");
const subCategory = JSON.parse(fs.readFileSync("./subcategory.json"), "utf-8");
const brand = JSON.parse(fs.readFileSync("./brands.json"), "utf-8");

// Insert data in DB
const insertData = async () => {
    try {
        await connectDB();
        await Product.syncIndexes();
        await Category.syncIndexes();
        await SubCategory.syncIndexes();
        await Brand.syncIndexes();
        await Product.create(products);
        await Category.create(category);
        await SubCategory.create(subCategory);
        await Brand.create(brand);
        console.log("Data Inserted".green.cyan);
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// Delete data from DB
const removeData = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Category.deleteMany();
        await SubCategory.deleteMany();
        await Brand.deleteMany();
        console.log("Data Removed".red.cyan);
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// node seeder.js -i === insert data
if (process.argv[2] === "-i") {
    insertData();
} else if (process.argv[2] === "-d") {
    // node seeder.js -d === remove data
    removeData();
}

