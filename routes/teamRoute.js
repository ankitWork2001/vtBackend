import express from 'express';
const router = express.Router();
import * as teamController from "../controllers/teamMemberController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

// GET all team members
router.get('/team-members',verifyToken,authorizeRoles('admin'), teamController.getAllTeamMembers);

// POST create team member
router.post('/team-members',verifyToken,authorizeRoles('admin'), teamController.createTeamMember);

// GET specific member
router.get('/team-members/:id',verifyToken,authorizeRoles('admin'), teamController.getTeamMemberById);

// PUT update
router.put('/team-members/:id',verifyToken,authorizeRoles('admin'), teamController.updateTeamMember);

// DELETE member
router.delete('/team-members/:id',verifyToken,authorizeRoles('admin'), teamController.deleteTeamMember);


export { router as teamRouter };