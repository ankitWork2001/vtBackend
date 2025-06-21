import {ServiceModel} from "../models/Service.js";


//to get all the services
export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



//to fetch user services

export const getUserServices = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    const services = await ServiceModel.find({ userId });
    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
import { ServiceModel } from '../models/serviceSchema.js';

// Create a new service
export const createService = async (req, res) => {
  try {
    const newService = new ServiceModel(req.body);
    const savedService = await newService.save();
    res.status(201).json({ message: 'Service created successfully', data: savedService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all services
export const getAllAdminServices = async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.status(200).json({ message: 'All services fetched', data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await ServiceModel.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: 'Service fetched', data: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update service by ID
export const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await ServiceModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: 'Service updated', data: updatedService });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete service by ID
export const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await ServiceModel.findByIdAndDelete(id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
