import { GetInTouchModel } from "../models/GetInTouch";

export const submitContactForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      topic,
      message,
      agreeToTerms
    } = req.body;

    if (!firstName || !email || !topic || !message || !agreeToTerms) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const contactEntry = new GetInTouchModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      topic,
      message,
      agreeToTerms
    });

    const savedEntry = await contactEntry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', data: savedEntry });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ message: 'Server error while submitting contact form' });
  }
};
