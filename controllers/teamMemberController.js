
import { TeamMember } from '../models/TeamMember.js';
import path from 'path';

// GET all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new team member

export const createTeamMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      gender,
      photoUrl // optional
    } = req.body;

    // 1. Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !position || !gender) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // 2. Check for existing email
    const existing = await TeamMember.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // 3. Create and save new team member
    const newMember = new TeamMember({
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      gender,
      photoUrl: photoUrl || "" // 
    });

    await newMember.save();

    res.status(201).json({
      message: "Team member added successfully.",
      data: newMember
    });

  } catch (error) {
    console.error("Add TeamMember Error:", error.message);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// GET one member
export const getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update member
export const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found." });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      gender,
      photoUrl // comes from body, not req.file
    } = req.body;

    // Update fields only if provided
    if (firstName) member.firstName = firstName;
    if (lastName) member.lastName = lastName;
    if (email) member.email = email;
    if (phoneNumber) member.phoneNumber = phoneNumber;
    if (position) member.position = position;
    if (gender) member.gender = gender;
    if (photoUrl) member.photoUrl = photoUrl;

    await member.save();
    res.status(200).json({
      message: "Team member updated successfully.",
      data: member
    });

  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(400).json({ message: "Failed to update team member." });
  }
};


// DELETE a member
export const deleteTeamMember = async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
