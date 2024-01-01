require('dotenv').config();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const fetch = require('node-fetch');
exports.sendSMS = catchAsyncErrors(async (req, res, next) => {
    const SERVICE_PLAN_ID = process.env.SINCH_PLAN_ID;
    const API_TOKEN = process.env.SINCH_API_TOKEN;
    const SINCH_NUMBER = process.env.SINCH_NO;
    const TO_NUMBER = '+919324891017';
    // const TO_NUMBER = '+919372300149';// RIZWAN
    const resp = await fetch('https://sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_TOKEN
            },
            body: JSON.stringify({
                from: SINCH_NUMBER,
                to: [TO_NUMBER],
                body: 'This is a test message'
            })
        });
    const data = await resp.json();
    console.log(data);
    res.status(200).json({
        success: true,
        data
    });
});
