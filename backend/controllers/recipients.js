import Recipient from "../models/Recipient.js";

export const getRecipients = async () => {
  try {
    const recipients = await Recipient.find();
    console.log("Fetched recipients");
    return recipients;
  } catch (err) {
    console.error("Error fetching recipients:", err.message);
    throw new Error("Failed to fetch recipients");
  }
};
