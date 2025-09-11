import { PickupModel } from "../models/PickupInfo.js";


export const createPickupInfo = async (req, res) => {
  try {
    const userId = req.user.id
    const { fullName, addressTitle, address, landmark, pickupDate, pickupTimeSlot } = req.body;

    if (!fullName || !addressTitle || !address || !pickupDate || !pickupTimeSlot) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newPickup = new PickupModel({
      userId, 
      fullName,
      addressTitle,
      address,
      landmark,
      pickupDate,
      pickupTimeSlot,
    });

    await newPickup.save();

    res.status(201).json({ success: true, message: "Pickup info saved", data: newPickup });
  } catch (error) {
    console.error("Error creating pickup info:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// recently not in use
export const savedPickupInfos = async (req, res) => {
  try {
    const id = req.user.id;

    const response = await PickupModel.findOne({userId:id}); 
    console.log(response)
    if (!response) {
      return res.status(404).json({ success: false, message: "Pickup info not found" });
    }

    return res.status(200).json({ success: true, data: response });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
