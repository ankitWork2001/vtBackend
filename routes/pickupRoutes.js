import express from 'express';
const router = express.Router();

router.post("/pickup-information", createPickupInfo);



export { router as pickupRouter };
