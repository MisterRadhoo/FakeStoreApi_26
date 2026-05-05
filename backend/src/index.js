require("dotenv").config(); // accessing enviroment variables
const path = require("path");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const CustomApiError = require("./utils/ApiError");
const passport = require("passport");
require("./config/passport");  // importing passport strategy

// error middlewares
const {
    jwtErrorHandler,
    zodErrorHandler,
    dbErrorHandler,
    globalErrorHandler
} = require("./middlewares/error/index");

// other middlewares
const ipLogger = require("./middlewares/ipLogger");
const setRateLimiter = require("./middlewares/limiter/rateLimiter");

const app = express();
const PORT = process.env.PORT || 1337;


//Routes
const {
    productsRouter,
    reviewRouter,
    categoryRouter,
    subCategoryRouter,
    brandRouter,
    couponRouter,
    taxRateListRouter
} = require("./routers/index");
const authRouter = require("./auth/authRouter");
const cartRouter = require("./cart/cartRouter");
const orderRouter = require("./order/orderRouter");
const wishlistRouter = require("./wishlist/wishlistRouter");
const addressRouter = require("./address/addressRouter");
const userRouter = require("./user/userRouter");
// Ai router
const AIrouter = require("./systemAI/AIrouter");

// CORS
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.50.78:5173"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// ipLogger middleware
app.use(ipLogger);
app.use("/static", express.static("src/public"));
app.set("query parser", "extended");  // when nested object are returned, they are parsed (legacy code);

// limiter
app.use(setRateLimiter({ windowMs: 5 * 60 * 1000, limit: 399, message: "Too many requests! Try again later" }));






app.get("/", (req, res) => {
    res.json({ message: "FakeStoreAPI backend is succesfully running!" });
});


//Routes middleware
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/taxrates", taxRateListRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/users", userRouter);

app.use("/api/openai", AIrouter);


// Guard url
app.use("/*splat", (req, res, next) => {
    return next(CustomApiError.notFound(req.originalUrl, "path"));
});



app.use(jwtErrorHandler);
app.use(zodErrorHandler);
app.use(dbErrorHandler);
// Global error handler
app.use(globalErrorHandler);

// Connect to database
(async () => {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})().catch((err) => {
    console.error("Server disconnected...", err);
    process.exit(1);
});




