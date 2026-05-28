import { appendFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "../test-output");
const JSON_FILE = path.join(OUTPUT_DIR, "review_metrics.jsonl");
const CSV_FILE = path.join(OUTPUT_DIR, "review_metrics.csv");

function csvEscape(value) {
    const stringValue = String(value ?? "");
    return `"${stringValue.replace(/"/g, '""')}"`;
}

function shuffleArray(items) {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function saveMetrics(metrics) {
    await mkdir(OUTPUT_DIR, { recursive: true });

    await appendFile(JSON_FILE, `${JSON.stringify(metrics)}\n`, "utf-8");

    if (!existsSync(CSV_FILE)) {
        const header = [
            "timestamp",
            "scenarioType",
            "actionType",
            "selectedProductId",
            "selectedProductTitle",
            "checkedProductIds",
            "checkedProductTitles",
            "productsCheckedCount",
            "reviewLength",
            "wordCount",
            "rating",
            "reviewType",
            "reviewText",
            "result"
        ].join(",");

        await appendFile(CSV_FILE, `${header}\n`, "utf-8");
    }

    const row = [
        csvEscape(metrics.timestamp),
        csvEscape(metrics.scenarioType),
        csvEscape(metrics.actionType),
        csvEscape(metrics.selectedProductId),
        csvEscape(metrics.selectedProductTitle),
        csvEscape((metrics.checkedProductIds || []).join("|")),
        csvEscape((metrics.checkedProductTitles || []).join("|")),
        csvEscape(metrics.productsCheckedCount),
        csvEscape(metrics.reviewLength),
        csvEscape(metrics.wordCount),
        csvEscape(metrics.rating),
        csvEscape(metrics.reviewType),
        csvEscape(metrics.reviewText),
        csvEscape(metrics.result)
    ].join(",");

    await appendFile(CSV_FILE, `${row}\n`, "utf-8");
}

export async function getProductIds(page) {
    const response = await page.request.get(
        "http://localhost:7800/api/products?limit=50"
    );

    expect(response.ok()).toBeTruthy();

    const result = await response.json();

    expect(Array.isArray(result.data)).toBeTruthy();

    const ids = result.data.map((product) => product._id);

    return shuffleArray(ids);
}

export async function getProductsForReview(page) {
    const response = await page.request.get(
        "http://localhost:7800/api/products?limit=50"
    );

    expect(response.ok()).toBeTruthy();

    const result = await response.json();

    expect(Array.isArray(result.data)).toBeTruthy();

    const products = result.data.map((product) => ({
        id: product._id,
        title: product.title
    }));

    return shuffleArray(products);
}

export async function getReviewState(page) {
    const editButton = page.getByRole("button", { name: /edit/i });
    const deleteButton = page.getByRole("button", { name: /delete/i });

    const ratingInput = page.locator("#review-ratings");
    const titleInput = page.locator("#review-title");
    const submitButton = page.locator('form button[type="submit"]');

    const hasExistingReview =
        (await editButton.count()) > 0 &&
        (await deleteButton.count()) > 0;

    const hasReviewForm =
        (await ratingInput.count()) > 0 &&
        (await titleInput.count()) > 0 &&
        (await submitButton.count()) > 0;

    return {
        hasExistingReview,
        hasReviewForm
    };
}

export async function addReview(page, ratingValue, reviewText, typingDelay = 50) {
    const ratingInput = page.locator("#review-ratings");
    const titleInput = page.locator("#review-title");
    const submitButton = page.locator('form button[type="submit"]');

    await expect(ratingInput).toBeVisible();
    await expect(titleInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    await ratingInput.fill(String(ratingValue));
    await titleInput.click();
    await titleInput.fill("");
    await page.keyboard.type(reviewText, { delay: typingDelay });

    await submitButton.click();

    await expect(
        page.getByText(new RegExp(escapeRegex(reviewText), "i"))
    ).toBeVisible();
}

export async function editReview(page, ratingValue, reviewText, typingDelay = 50) {
    await page.getByRole("button", { name: /edit/i }).click();

    const ratingInput = page.locator("#review-ratings");
    const titleInput = page.locator("#review-title");
    const submitButton = page.locator('form button[type="submit"]');

    await expect(ratingInput).toBeVisible();
    await expect(titleInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    await ratingInput.fill(String(ratingValue));
    await titleInput.click();
    await titleInput.fill("");
    await page.keyboard.type(reviewText, { delay: typingDelay });

    await submitButton.click();

    await expect(
        page.getByText(new RegExp(escapeRegex(reviewText), "i"))
    ).toBeVisible();
}

export async function deleteReview(page) {
    await page.getByRole("button", { name: /delete/i }).click();

    const ratingInput = page.locator("#review-ratings");
    const titleInput = page.locator("#review-title");
    const submitButton = page.locator('form button[type="submit"]');
    const editButton = page.getByRole("button", { name: /edit/i });
    const deleteButton = page.getByRole("button", { name: /delete/i });

    await expect(ratingInput).toBeVisible();
    await expect(titleInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    await expect(editButton).toHaveCount(0);
    await expect(deleteButton).toHaveCount(0);
}