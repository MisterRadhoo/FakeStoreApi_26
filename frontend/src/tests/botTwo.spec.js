import { test, expect } from "@playwright/test";
import {
    getProductsForReview,
    getReviewState,
    addReview,
    deleteReview,
    saveMetrics
} from "./utils/reviewFlow.js";
import {
    fakeLikeBotMessages,
    allFakeLikeBotMessages
} from "./utils/botReviews.js";

test("fake-like text multiple reviews flow", async ({ page }) => {
    const BOT_EMAIL = "bot2@email.com";
    const BOT_PASSWORD = "forzarapid";
    const MAX_PRODUCTS_TO_REVIEW = 11;

    // options: ....
    const MESSAGE_SOURCE = "repetitiveTemplate";

    const selectedMessagePool =
        MESSAGE_SOURCE === "all"
            ? allFakeLikeBotMessages
            : fakeLikeBotMessages[MESSAGE_SOURCE];

    expect(Array.isArray(selectedMessagePool)).toBeTruthy();
    expect(selectedMessagePool.length).toBeGreaterThan(0);

    const checkedProductIds = [];
    const checkedProductTitles = [];

    let productsCheckedCount = 0;
    let createdReviewsCount = 0;

    await page.goto("http://localhost:5173/auth/login");
    await page.locator("#email").fill(BOT_EMAIL);
    await page.locator("#password").fill(BOT_PASSWORD);
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page).toHaveURL(/account/);

    const products = await getProductsForReview(page);

    for (const product of products) {
        if (createdReviewsCount >= MAX_PRODUCTS_TO_REVIEW) {
            break;
        }

        productsCheckedCount += 1;
        checkedProductIds.push(product.id);
        checkedProductTitles.push(product.title);

        const selectedReview =
            selectedMessagePool[createdReviewsCount % selectedMessagePool.length];

        const reviewText = selectedReview.text;
        const ratingValue = selectedReview.rating;

        let actionType = "";

        await page.goto(`http://localhost:5173/products/${product.id}`);

        await expect(page.getByText(/your review/i)).toBeVisible();

        const state = await getReviewState(page);

        if (state.hasExistingReview) {
            await deleteReview(page);
            await addReview(page, ratingValue, reviewText, 0);

            actionType = "delete_then_create_review";
            createdReviewsCount += 1;
        } else if (state.hasReviewForm) {
            await addReview(page, ratingValue, reviewText, 0);

            actionType = "create_review";
            createdReviewsCount += 1;
        } else {
            continue;
        }

        const metrics = {
            timestamp: new Date().toISOString(),
            scenarioType: "fake_like_text",
            actionType,
            selectedProductId: product.id,
            selectedProductTitle: product.title,
            checkedProductIds: [...checkedProductIds],
            checkedProductTitles: [...checkedProductTitles],
            productsCheckedCount,
            reviewLength: reviewText.length,
            wordCount: reviewText.split(/\s+/).filter(Boolean).length,
            rating: ratingValue,
            reviewType: MESSAGE_SOURCE,
            reviewText,
            result: "success"
        };

        console.log(metrics);
        await saveMetrics(metrics);
    }

    expect(createdReviewsCount).toBeGreaterThan(0);

    await page.getByRole("button", { name: /logout/i }).click();
    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();
});