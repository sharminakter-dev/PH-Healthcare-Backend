import { Router } from "express";
import { AppoinmentController } from "./appoinment.controller";


const router = Router();

router.post(
    "/book-appointment", 
    AppoinmentController.bookAppointment
);

router.get("/book-appointment/payment/callback", AppoinmentController.bookAppointmentCallback)

export const AppointmentRoutes = router;
