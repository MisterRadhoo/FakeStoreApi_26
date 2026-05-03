import { test, expect } from "@playwright/test";
import {
    getProductIds,
    getReviewState,
    addReview,
    deleteReview,
    saveMetrics
} from "./utils/reviewFlow.js";

test("bot full flow", async ({ page }) => {
    const sessionStart = Date.now();
    const loginStart = Date.now();

    const botReviewTexts = [
        "Amazing product!!! Must buy!!! Best ever!!!",
        "Excellent item!!! Highly recommended!!!",
        "Superb product!!! Five stars!!!",
        "Perfect quality!!! Buy now!!!",
        "Awesome product!!"
    ];

    const botRatings = [4, 5, 5, 5, 5];

    const reviewText =
        botReviewTexts[Math.floor(Math.random() * botReviewTexts.length)];
    const ratingValue =
        botRatings[Math.floor(Math.random() * botRatings.length)];

    let selectedProductId = "";
    let actionType = "";
    let productsCheckedCount = 0;
    let scrollCount = 0;
    let typingDurationMs = 0;
    let submitActionDurationMs = 0;
    let checkedProductIds = [];

    await page.goto("http://localhost:5173/auth/login");
    await page.locator("#email").fill("radhoo@emailfaker.com");
    await page.locator("#password").fill("forzarapid");
    await page.getByRole("button", { name: /login/i }).click();
    await expect(page).toHaveURL(/account/);

    const loginEnd = Date.now();
    const productIds = await getProductIds(page);

    for (const productId of productIds) {
        productsCheckedCount += 1;
        checkedProductIds.push(productId);

        console.log("Trying product:", productId);

        await page.goto(`http://localhost:5173/products/${productId}`);
        await expect(page.getByText(/your review/i)).toBeVisible();

        const state = await getReviewState(page);

        if (state.hasExistingReview) {
            console.log("Review already exists on product:", productId);

            await deleteReview(page);

            const result = await addReview(page, ratingValue, reviewText, 1);

            console.log("Review deleted and recreated on product:", productId);

            selectedProductId = productId;
            actionType = "delete_then_create_review";
            typingDurationMs = result.typingDurationMs;
            submitActionDurationMs = result.submitActionDurationMs;
            break;
        }

        if (state.hasReviewForm) {
            const result = await addReview(page, ratingValue, reviewText, 1);

            console.log("Review added on product:", productId);

            selectedProductId = productId;
            actionType = "create_review";
            typingDurationMs = result.typingDurationMs;
            submitActionDurationMs = result.submitActionDurationMs;
            break;
        }
    }

    expect(selectedProductId).toBeTruthy();

    const sessionEnd = Date.now();

    const metrics = {
        timestamp: new Date().toISOString(),
        behaviorLabel: "bot",
        actionType,
        selectedProductId,
        checkedProductIds,
        productsCheckedCount,
        loginDurationMs: loginEnd - loginStart,
        typingDurationMs,
        submitActionDurationMs,
        sessionDurationMs: sessionEnd - sessionStart,
        scrollCount,
        reviewLength: reviewText.length,
        wordCount: reviewText.split(/\s+/).length,
        rating: ratingValue,
        reviewText,
        result: "success"
    };

    console.log(metrics);
    await saveMetrics(metrics);

    await page.getByRole("button", { name: /logout/i }).click();
    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();
});