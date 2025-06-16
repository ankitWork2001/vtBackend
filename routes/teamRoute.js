import express from 'express';
const router = express.Router();
import * as teamController from "../controllers/teamMemberController.js";

router.get('/teamMember', teamController.teamMemberContoller);

export { router as teamRouter };