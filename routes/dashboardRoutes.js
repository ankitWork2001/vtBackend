import express from 'express';
const router = express.Router();

router.get('/dashboard');

export { router as dashboardRouter };
