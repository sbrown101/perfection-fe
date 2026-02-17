import { Page, Locator, expect } from "@playwright/test";

export class SaveUploadPage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly statusText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('input[data-testid="file-input"]');
        this.statusText = page.locator('p[data-testid="status-text"]');
        this.taskList = page.locator('ul[data-testid="task-list"]');
    }

    async goto() {
        await this.page.goto("http://localhost:5173");
    }

    async uploadFile(filePath: string) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent("filechooser"),
            this.fileInput.click()
        ]);
        await fileChooser.setFiles(filePath);
    }

    async analyse() {
        await this.page.locator('button[data-testid="analyse-button"]').click();
    }

    async expectStatus(expected: string) {
        await expect(this.statusText).toHaveText(expected);
    }

    async expectTaskListToExist() {
        const tasks = this.taskList.locator('li');
        expect(await tasks.count()).toBeGreaterThan(0);
    }
}


