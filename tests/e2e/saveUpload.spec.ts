import { test } from "@playwright/test";
import { SaveUploadPage } from "../pages/SaveUploadPage";

test("User can upload a valid save file and sees success", async ({ page }) => {
  const saveUploadPage = new SaveUploadPage(page);
  const filePath = "tests/fixtures/validSave.xml"

  // Given
  await saveUploadPage.goto();

  // When
  await saveUploadPage.uploadFile(filePath)

  // Then
  await saveUploadPage.expectStatus("File loaded")
})

test("User can analyse a valid save file and sees tasks displayed", async ({ page }) => {
  const saveUploadPage = new SaveUploadPage(page);
  const filePath = "tests/fixtures/validSave.xml"

  // Given
  await saveUploadPage.goto();
  await saveUploadPage.uploadFile(filePath);

  // When
  await saveUploadPage.analyse();

  // Then
  await saveUploadPage.expectTaskListToExist();
})

test("User can see an error message when uploading a save file which is not valid XML", async ({ page }) => {
  const saveUploadPage = new SaveUploadPage(page);
  const filePath = "tests/fixtures/notXml.xml"

  // Given
  await saveUploadPage.goto();

  // When
  await saveUploadPage.uploadFile(filePath);

  // Then
  await saveUploadPage.expectStatus("File is not valid XML")
})
