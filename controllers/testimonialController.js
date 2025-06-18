import { Testimonial } from '../models/Testimonial.js';

export const addTestimonial = async (req, res) => {
 try {
    const { userName, comment, rating } = req.body;

    const userId = req.user ? req.user.id : null;

    if (!userName || !comment || !rating) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = new Testimonial({
        userId,
        userName,
        comment,
        rating,
    });

    await newTestimonial.save();

    res.status(201).json({
        message: "Testimonial submitted successfully. Pending approval",
        testimonial: newTestimonial,
    });

 } catch (error) {
    console.error("Error adding testimonial", error);
    res.status(500).json({ message: "Server error" });
 }
};

export const getAllApprovedTestimonials = async (req, res) => {
    try{
        const getAllApprovedTestimonials = await Testimonial.find({
            isApproved: true,
        }).sort({ createdAt: -1 });
        res.status(200).json(getAllApprovedTestimonials);
    } catch (error) {
        console.error("Error fetching approved testimonial:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllTestimonials = async (req, res) => {

    try{
        const testimonials = await Testimonial.find().sort({ createdAt: -1});
        res.status(200).json(testimonials);
    }catch (error) {
        console.error("Error fetching all testimonials:", error);
        res.status(500).json({ message: "Server error"});
    }
};


export const approvedTestimonial = async (req, res) => {
    try{
        const testimonialId = req.params.id;

        const updated = await Testimonial.findByIdAndUpdate(
            testimonialId,
            { isApproved: true },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ messsage: 'Testimonila not found' });
        }

        res.status(200).json({
            message: 'Testimonial approved successfully',
            testimonial: updated
        });
    } catch (error) {
        console.log("Error approving testimonial:", error);
        res.status(500).json({ message: "Server error" });
    }
};