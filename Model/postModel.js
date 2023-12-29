const mongoose = require("mongoose");
const userPostSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postCaption: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
});

module.exports = new mongoose.model("UserPost", userPostSchema);
