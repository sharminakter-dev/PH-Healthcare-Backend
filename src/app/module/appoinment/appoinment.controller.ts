import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { AppointmentServices } from "./appoinment.service";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
 
    const result =await AppointmentServices.bookAppointment();

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Verification OTP Sent",
        data: result,
    });
});

const bookAppointmentCallback = catchAsync(async (req: Request, res: Response) => {
 

    const {executedPaymentResult, redirectUrl} = await AppointmentServices.bookAppointmentCallback(req.query);

    console.log(executedPaymentResult, "callback controller");

    res.redirect(redirectUrl)
    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "Verification OTP Sent",
    //     data: executedPaymentResult,
    // });
});

export const AppoinmentController = {
    bookAppointment,
    bookAppointmentCallback
}