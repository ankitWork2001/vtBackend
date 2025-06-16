import { EventModel } from '../models/eventSchema.js';

// GET /api/events - Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().populate('participants').populate('createdBy');
    res.status(200).json({ message: "Events fetched successfully", data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET /api/events/:id - Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id).populate('participants').populate('createdBy');

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event fetched successfully", data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// POST /api/events - Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, start, end, status, participants, createdBy } = req.body;

    const newEvent = new EventModel({
      title,
      description,
      start,
      end,
      status,
      participants,
      createdBy
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created successfully", data: savedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// PUT /api/events/:id - Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE /api/events/:id - Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EventModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
