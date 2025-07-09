// | Function Purpose                | Suggested Name                      |
// | ------------------------------- | ----------------------------------- |
// | ➕ Create a new pill reminder    | `createReminder`                    |
// | 📥 Get all reminders for a user | `getUserReminders`                  |
// | 🧾 Get a single reminder by ID  | `getReminderById`                   |
// | 📝 Update a specific reminder   | `updateReminder`                    |
// | ❌ Delete a reminder             | `deleteReminder`                    |
// | 🔄 Mark reminder as taken/done  | `toggleReminderStatus` *(optional)* |

import Reminder from "../models/Reminder.js";
import User from "../models/user.js";




export const createReminder = async (req, res) => {
  try {
    const { medicineName, dosage, time, days, startDate, endDate, method, message } = req.body;

    if (!time || !days || !startDate) {
      return res.status(400).json({ success: false, message: "Time, days, and startDate are required." });
    }

    const reminder = await Reminder.create({
      user: req.id,
      medicineName,
      dosage,
      time,
      days,
      startDate,
      endDate,
      method,
      message
    });
    await User.findByIdAndUpdate(req.id, {
      $push: { reminders: reminder._id }
    });
    res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      reminder
    });
  } catch (error) {
    console.error("Create Reminder Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getUserReminders = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("reminders");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "All reminders of user",
      success: true,
      reminders: user.reminders
    });

  } catch (error) {
    console.log("GetUserReminders Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getReminderById = async (req, res) => {
  try {
    const userId = req.id;
    const reminderId = req.params.id;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const ownsReminder = user.reminders.includes(reminderId);
    if (!ownsReminder) {
      return res.status(403).json({ success: false, message: "Access denied: reminder does not belong to user" });
    }


    const reminder = await Reminder.findById(reminderId);
    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reminder fetched successfully",
      reminder
    });

  } catch (error) {
    console.log("GetReminderById Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const updateReminder = async (req, res) => {
  try {
    const userId = req.id;
    const reminderId = req.params.id;
    const {
      medicineName,
      dosage,
      time,
      days,
      startDate,
      endDate,
      method,
      message,
      isActive
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.reminders.includes(reminderId)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const reminder = await Reminder.findById(reminderId);
    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    if (medicineName) reminder.medicineName = medicineName;
    if (dosage) reminder.dosage = dosage;
    if (time) reminder.time = time;
    if (days) reminder.days = days;
    if (startDate) reminder.startDate = startDate;
    if (endDate) reminder.endDate = endDate;
    if (method) reminder.method = method;
    if (message) reminder.message = message;
    if (typeof isActive === "boolean") reminder.isActive = isActive;

    await reminder.save();

    return res.status(200).json({
      success: true,
      message: "Reminder updated successfully",
      reminder
    });

  } catch (error) {
    console.error("UpdateReminder Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const userId = req.id;
    const reminderId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.reminders.includes(reminderId)) {
      return res.status(403).json({ success: false, message: "Access denied: reminder not linked to user" });
    }

    await Reminder.findByIdAndDelete(reminderId);

    await User.findByIdAndUpdate(userId, {
      $pull: { reminders: reminderId }
    });

    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully"
    });

  } catch (error) {
    console.error("DeleteReminder Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};