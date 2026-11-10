import { test, expect, request } from '@playwright/test';

// let reqContext2 : any;
// test.beforeAll("Before All the Tests",async()=>{
//    reqContext2 = await request.newContext({
//         baseURL : "https://restful-booker.herokuapp.com",
//         extraHTTPHeaders : {
//             Accept : "application/json"
//         }
//     });
// })

// test('API testing get practice 1' , async({request})=>{

//     const resp1 = await request.get("https://restful-booker.herokuapp.com/booking",{
//       headers:{
//         Accept : "application/json"
//     }
       
//     })
   
//     console.log(await resp1.json());

// })

// test('API testing get practice 2' , async()=>{
//     const reqContext = await request.newContext({
//         baseURL : "https://restful-booker.herokuapp.com",
//         extraHTTPHeaders : {
//             Accept : "application/json"
//         }
//         }
//     );
//     const resp2 = await reqContext.get("/booking");
//     console.log(await resp2.json());

// })

// test('API testing get practice 3' , async( )=>{

//     const resp3 = await reqContext2.get("/booking");
//     console.log(await resp3.json());

// })

// test('API testing get practice 4' , async( {request})=>{

//     const resp4 = await request.get("/booking");
//     console.log(await resp4.json());

// })

// test('API testing get practice 5' , async( {request})=>{

//     const resp5 = await request.get("/booking/1");
//     console.log(await resp5.json());

// })

// test('API testing get practice 6' , async( {request})=>{

//     const resp6 = await request.get("/booking?firstname=Eric&lastname=Brown");
//     console.log(await resp6.json());

// })

// test('API testing get practice 7' , async( {request})=>{

//     const resp7 = await request.get("/booking",
//         {
//             params:{
//                  firstname: 'Eric',
//                  lastname: 'Brown'
//             }
//         })
//     console.log(await resp7.json());

// })

test('API testing get practice 8' , async( {request})=>{

    const resp8 = await request.get("/booking/1");
    console.log(await resp8.json());
    expect(resp8.status()).toBe(200);
    expect(resp8.ok()).toBeTruthy();
    expect(await resp8.json()).toMatchObject({
      firstname: 'Mark',
      lastname: 'Ericsson',
      totalprice: 607,
      depositpaid: true,
      bookingdates: { checkin: '2023-06-07', checkout: '2025-01-28' }
});


})