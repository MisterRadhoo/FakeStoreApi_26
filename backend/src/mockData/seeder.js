const dotenv = require("dotenv");
const fs = require("fs");
const { User, Product, Category, SubCategory, Brand, Coupon, TaxRatesList } = require("../models/index");
require("colors");

dotenv.config({ path: "../../.env" });
const connectDB = require("../config/database");

// Read data
const user = JSON.parse(fs.readFileSync("./user.json"), "utf-8");
const products = JSON.parse(fs.readFileSync("./products.json"), "utf-8");
const category = JSON.parse(fs.readFileSync("./category.json"), "utf-8");
const subCategory = JSON.parse(fs.readFileSync("./subcategory.json"), "utf-8");
const brand = JSON.parse(fs.readFileSync("./brands.json"), "utf-8");
const coupon = JSON.parse(fs.readFileSync("./coupon.json"), "utf-8");
const taxRatesList = JSON.parse(fs.readFileSync("./taxRatesList.json"), "utf-8");

// Insert data in DB
const insertData = async () => {
    try {
        await connectDB();
        // sync indexes
        await User.syncIndexes();
        await Product.syncIndexes();
        await Category.syncIndexes();
        await SubCategory.syncIndexes();
        await Brand.syncIndexes();
        await Coupon.syncIndexes();
        await TaxRatesList.syncIndexes();
        // create collections
        await User.create(user);
        await Product.create(products);
        await Category.create(category);
        await SubCategory.create(subCategory);
        await Brand.create(brand);
        await Coupon.create(coupon);
        await TaxRatesList.create(taxRatesList);
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
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await SubCategory.deleteMany();
        await Brand.deleteMany();
        await Coupon.deleteMany();
        await TaxRatesList.deleteMany();
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

