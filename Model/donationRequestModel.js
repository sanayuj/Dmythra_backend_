const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  requestTitle: {
    type: String,
    required: true,
  },
  requestDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
  Verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("DonationRequest", donationSchema);
