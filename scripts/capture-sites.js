import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { projects } from "./work-sites.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "frontend", "public", "work-screenshots");

const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 844 }
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

for (const project of projects) {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });

    const filePath = path.join(outputDir, `${project.slug}-${viewport.name}.png`);
    try {
      await page.goto(project.url, { waitUntil: "networkidle", timeout: 45_000 });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: filePath, fullPage: viewport.name === "desktop" });
      console.info(`Captured ${project.slug} ${viewport.name} -> ${filePath}`);
    } catch (error) {
      console.error(`Failed ${project.slug} ${viewport.name}:`, error.message);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
