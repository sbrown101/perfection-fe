import { Page, Locator, expect } from "@playwright/test";

export class SaveUploadPage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly statusText: Locator;
    readonly taskTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('input[data-testid="file-input"]');
        this.statusText = page.locator('p[data-testid="status-text"]');
        this.taskTable = page.locator('tbody[data-testid="task-table-body"]');
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
        await expect(this.taskTable.locator('tr').first()).toBeVisible();
    }
}


