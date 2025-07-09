import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import sendEmail from "./sendEmail.js";



cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "long" }); // e.g., "Monday"
  const currentTime = now.toTimeString().slice(0, 5); // e.g., "08:30"

  const reminders = await Reminder.find({
    isActive: true,
    time: currentTime,
    days: currentDay,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ]
  }).populate("user");

  for (const reminder of reminders) {
    if (reminder.method === "email" && reminder.user?.email) {
      await sendEmail(reminder.user.email, "Medicine Reminder", reminder.message);
      console.log(`Reminder sent to ${reminder.user.email}`);
    }

    // You can extend this for push notification too
  }
});
