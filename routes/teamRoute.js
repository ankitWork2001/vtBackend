import express from 'express';
const router = express.Router();
import * as teamController from "../controllers/teamMemberController.js";

// GET all team members
router.get('/team-members', teamController.getAllTeamMembers);

// POST create team member
router.post('/team-members', teamController.createTeamMember);

// GET specific member
router.get('/team-members/:id', teamController.getTeamMemberById);

// PUT update
router.put('/team-members/:id', teamController.updateTeamMember);

// DELETE member
router.delete('/team-members/:id', teamController.deleteTeamMember);


export { router as teamRouter };