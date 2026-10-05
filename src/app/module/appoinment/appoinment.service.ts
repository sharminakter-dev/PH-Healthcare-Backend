import { Query } from "pg";
import config from "../../config"
import { getBkashIdToken } from "../../lib/bkash"

const bookAppointment = async()=>{


    const bkashIdToken = await getBkashIdToken();

    if(!bkashIdToken){
        throw new Error("No Bkash Access Token Found.")
    }

    const bkashCreatePaymentResponse = await fetch(`${config.bkash_base_url}/tokenized/checkout/create`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: bkashIdToken,
            "X-App-Key": config.bkash_app_key
        },
        body: JSON.stringify({
            agreementID:'TokenizedMerchant01L3IKB6H1565072174986', //appointment id
            mode: "0011",
            payerReference: "01723888888",
            callbackURL: `${config.bkash_callback_api}/appointment/book-appointment/payment/callback`,
            merchantAssociationInfo: "MI05MID54RF09123456One",
            amount: "120",
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "Inv0124845983"
        })
    });

    const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json()

    return bkashCreatePaymentResult;
}

const bookAppointmentCallback = async(query: Record<string, any>)=>{

    const paymentID = query.paymentID;
    const status = query.status;

    if(!paymentID){
        throw new Error("Payment Is Missing.");
    }

    if(!status){
        throw new Error("Payment Status is missing")
    }

    const bkashIdToken = await getBkashIdToken();

    if(!bkashIdToken){
        throw new Error("No Bkash Access Token Found.")
    }


    const executedPaymentResponse = await fetch(`${config.bkash_base_url}/tokenized/checkout/execute`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: bkashIdToken,
            "X-App-Key": config.bkash_app_key
        },
        body: JSON.stringify({
            paymentID: paymentID
        })
    });

    const executedPaymentResult = await executedPaymentResponse.json();


    if(status === 'success'){
        return {
            executedPaymentResult,
            transactionId: executedPaymentResult.trxID,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=success`
        }
    }

    if(status === 'failure'){
        return {
            executedPaymentResult,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=failure`
        }
    }
    if(status === 'cancel'){
        return {
            executedPaymentResult,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=cancel`
        }
    }
    
    return {
        executedPaymentResult,
        redirectUrl: `${config.frontend_url}/dashboard/my-appointments?`
    }
}

export const AppointmentServices = {
    bookAppointment,
    bookAppointmentCallback
}