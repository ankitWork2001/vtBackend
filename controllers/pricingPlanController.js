import { PricingModel } from "../models/PricingPlan.js";

export const pricingController = async (req, res) => {
    try {
        const plan = await PricingModel.find();
        if (!plan) {
            return res.status(400).json({ success: false, message: "Plans not found!" })
        }
        res.status(200).json({ success: true, message: "Successfully found all plans.", data: plan });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
};

export const specificPlanController = async (req, res) => {
    try {
        const { id } = req.params;
        const specificPlan = await PricingModel.findById(id);

        if (!specificPlan) {
            return res.status(400).json({ success: false, message: "Plan not found" })
        }

        res.status(200).json({ status: true, message: "Plan found successfully", data: specificPlan })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const createPlanController = async (req, res) => {
    try {
        const {
            name,
            description,
            features,
            monthlyPrice,
            yearlyPrice,
            currency,
            isPopular,
            status,
            sortOrder
        } = req.body;

        const newPlan = new PricingModel({
            name,
            description,
            features,
            monthlyPrice,
            yearlyPrice,
            currency,
            isPopular,
            status,
            sortOrder
        });

        const savedPlan = await newPlan.save();
        res.status(201).json({
            success: true,
            message: "Pricing plan created successfully",
            data: savedPlan
        });
    } catch (err) {
        console.error("Error creating pricing plan:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create pricing plan",
            error: err.message
        });
    }
}

export const updatePlanController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatePlan = await PricingModel.findByIdAndUpdate(
            id,
            updatedData,
            {new:true,runValidators:true}
        );

        if(!updatePlan){
            return res.status(400).json({success:false,message:"pricing plan not found with this ID"})
        }

        res.status(200).json({success:true,message:"pricing plan updated successfully",data:updatePlan})


    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }

}

export const deletePlanController = async(req, res) => {
    try {
        const {id} = req.params;
        const deletePlan = await PricingModel.findByIdAndDelete(id);
        if(!deletePlan){
            return res.status(400).json({success:false,message:"pricing plan not found with this ID"});
        }
        res.status(200).json({success:true,message:"pricing plan deleted successfully", data:deletePlan})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}