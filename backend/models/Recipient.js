import mongoose from "mongoose";

const RecipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipient = mongoose.model("Recipient", RecipientSchema);

export default Recipient; 
