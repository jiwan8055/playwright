import { test, expect } from '@playwright/test';

  test('should work with form inputs and search', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the search shortcut button
    await page.getByRole('button', { name: 'Search' }).click();

    // Fill out the search input field
    const searchInput = page.getByPlaceholder('Search docs');
    await searchInput.fill('TypeScript');

    // Press Enter to execute the search query
    await searchInput.press('Enter');

    // Verify search results page loaded correctly
    await expect(page).toHaveURL("https://playwright.dev/");
  });
