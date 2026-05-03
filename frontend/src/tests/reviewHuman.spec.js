import { test, expect } from "@playwright/test";
import {
    getProductIds,
    getReviewState,
    addReview,
    editReview,
    saveMetrics
} from "./utils/reviewFlow.js";

test("human full flow", async ({ page }) => {
    const sessionStart = Date.now();
    const loginStart = Date.now();

    const humanReviewTexts = [
        "Very satisfied with the store's services, I recommend it.",
        "Good product, fast delivery, and a pleasant experience. The materials seem okay and I would definitely buy again.",
        "The quality is outstanding, the product is worth the money, and the size fit well. Overall, I am satisfied.",
        "I like how it looks and it seems comfortable. For this price, the product is a good choice.",
        "A unique experience, and the product seems well made. I highly recommend it."
    ];

    const humanRatings = [3, 4, 4, 5, 5];

    const reviewText =
        humanReviewTexts[Math.floor(Math.random() * humanReviewTexts.length)];
    const ratingValue =
        humanRatings[Math.floor(Math.random() * humanRatings.length)];

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
    await page.waitForTimeout(600);
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

        const scrollActionsCount = Math.floor(Math.random() * 4) + 1;

        await page.waitForTimeout(Math.floor(Math.random() * 700) + 400);

        for (let i = 0; i < scrollActionsCount; i += 1) {
            const scrollDistance = Math.floor(Math.random() * 450) + 150;
            const scrollPauseMs = Math.floor(Math.random() * 700) + 250;

            await page.mouse.wheel(0, scrollDistance);
            scrollCount += 1;
            await page.waitForTimeout(scrollPauseMs);
        }

        const state = await getReviewState(page);

        if (state.hasExistingReview) {
            console.log("Review already exists on product:", productId);

            const result = await editReview(
                page,
                ratingValue,
                "I updated the review after using the product. It remains a good choice.",
                60
            );

            selectedProductId = productId;
            actionType = "edit_review";
            typingDurationMs = result.typingDurationMs;
            submitActionDurationMs = result.submitActionDurationMs;
            break;
        }

        if (state.hasReviewForm) {
            const result = await addReview(page, ratingValue, reviewText, 60);

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
        behaviorLabel: "human",
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

    await page.waitForTimeout(700);
    await page.getByRole("button", { name: /logout/i }).click();
    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();
});