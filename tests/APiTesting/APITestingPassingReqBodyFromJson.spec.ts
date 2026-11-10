import{expect, request, test} from '@playwright/test'
import ApiData from 'D:/Automation/testData/ApiData.json'

test("API Testing Passing Req Body From Json", async({request})=>{
    const resp = await request.post("https://restful-booker.herokuapp.com/booking",{
        data:ApiData.Postcall
    })

    const respJson = await resp.json();
    console.log(respJson);
    expect(respJson.booking).toMatchObject(ApiData.Postcall);
    expect(respJson.booking.additionalneeds).toEqual(ApiData.Postcall.additionalneeds);
})