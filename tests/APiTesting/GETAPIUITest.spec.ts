import{test,request,expect} from '@playwright/test'

test("UI API Validation",async({request,page})=>{
    const resp = await request.get("https://api.demoblaze.com/entries");
    const jsonresp = await resp.json();
    console.log(jsonresp.Items[0].title);
    await page.goto("https://www.demoblaze.com/");
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(jsonresp.Items[0].title);
})