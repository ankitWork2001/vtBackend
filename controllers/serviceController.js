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