import{expect, request, test} from '@playwright/test'

test("API Testing Post call 1",async({request})=>{
    const resp1 = await request.post("/booking",{
        data:{
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
    })
    const jsonResp = await resp1.json();
    console.log(jsonResp);
    expect(resp1.statusText()).toBe("OK");
    expect(resp1.status()).toBe(200);

})

test("API UI Verification", async({request,page})=>{
    const resp2 = await request.post("https://api.demoblaze.com/addtocart",{
        data: {"id":"f0e95e69-2f20-53bd-2ba8-2f5ca175a7e0","cookie":"user=7fedeffb-c605-0c26-2020-7574c4fc7ae3","prod_id":3,"flag":false}

    })
    expect(resp2.status()).toBe(200);
})