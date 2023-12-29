const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
const trainingModel = require("../Model/TrainingModel");
const academicModel = require("../Model/academicModel");
const announcementModel = require("../Model/announcementModel");
const donationModel = require("../Model/donationRequestModel");
const postModel = require("../Model/postModel");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, "adminJWT", {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      if (auth) {
        const token = createToken(admin._id);
        res.json({
          message: "Successfully logined",
          data: admin,
          status: true,
          token,
        });
      } else {
        res.json({ message: "Invailed Password", status: false });
      }
    } else {
      res.json({ message: "Admin not found ", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in login page",
      status: false,
    });
  }
};

module.exports.userDetails = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users) {
      res.json({ message: "users founded", status: true, user: users });
    } else {
      res.json({ message: "No user found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in user details",
      status: false,
    });
  }
};
module.exports.blockuser = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userDetails = await userModel.findById(userId);

    userDetails.blockStatus = !userDetails.blockStatus;
    await userDetails.save();

    if (userDetails.blockStatus) {
      return res.json({
        message: "User blocked successfully",
        status: userDetails.blockStatus,
      });
    } else {
      return res.json({
        message: "User unblocked successfully",
        status: userDetails.blockStatus,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error in block user", status: false });
  }
};

module.exports.addtrainingDetails = async (req, res, next) => {
  const { videoName, videoDescription, videoLink } = req.body;
  try {
    const extractVideoKey = (link) => {
      const match = link.match(/[?&]v=([^?&]+)/);
      return match ? match[1] : "";
    };
    const videoExist = await trainingModel.findOne({ videoLink: videoLink });
    if (videoExist) {
      return res.json({ message: "Video already exists", status: false });
    }
    const trainingDetails = new trainingModel({
      videoName: videoName,
      videoDescription: videoDescription,
      videoLink: videoLink,
      videoKey: extractVideoKey(videoLink),
    });
    await trainingDetails.save();
    return res.json({
      message: "Training Details submitted successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in add training details",
      status: false,
    });
  }
};

module.exports.addacademic = async (req, res, next) => {
  const { videoName, videoDescription, videoLink } = req.body;
  try {
    const extractVideoKey = (link) => {
      const match = link.match(/[?&]v=([^?&]+)/);
      return match ? match[1] : "";
    };
    const videoExist = await academicModel.findOne({ videoLink: videoLink });
    if (videoExist) {
      return res.json({ message: "Video already exists", status: false });
    }
    const newAcademicDetails = new academicModel({
      videoName: videoName,
      videoDescription: videoDescription,
      videoLink: videoLink,
      videoKey: extractVideoKey(videoLink),
    });
    await newAcademicDetails.save();
    return res.json({
      message: "Academic Details submitted successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server in adding academic details",
      status: false,
    });
  }
};

module.exports.addAnnouncement = async (req, res, next) => {
  const { announcementTopic, announcementDescription } = req.body;
  try {
    const announcementExists = await announcementModel.findOne({
      announcementTopic: announcementTopic,
    });
    if (announcementExists) {
      res.json({ message: "Announcement already exists", status: true });
    }
    const newAnnouncement = new announcementModel({
      announcementTopic: announcementTopic,
      announcementDescription: announcementDescription,
    });

    await newAnnouncement.save();
    res.json({ message: "Announcement submit successfully", status: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in add announcement",
      status: false,
    });
  }
};

module.exports.fetchDonation = async (req, res, next) => {
  try {
    const donationDetails = await donationModel.find({}).populate({
      path: "ownerId",
      model: "user",
      select: "username email",
    });
    return res.json({
      message: "Donation details fetched",
      data: donationDetails,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch documents",
      status: false,
    });
  }
};

module.exports.fetchPostDetails = async (req, res, next) => {
  try {
    const userPostDetails = await postModel.find({}).populate({
      path: "ownerId",
      model: "user",
      select: "userName email",
    });
    res.json({
      message: "user post details fetched successfully",
      data: userPostDetails,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch post details",
      status: false,
    });
  }
};

module.exports.verifyDonation = async (req, res, next) => {
  const donationId = req.params.donationId;
  console.log(donationId, "&&&&&");
  try {
    // const verifyDonation=await donationModel.findOne({_id:new ObjectId(Id) })
    // console.log(verifyDonation,"Data");
    await donationModel.updateOne(
      { _id: donationId },
      { $set: { Verified: true } }
    );
    res.json({ message: "Verified Successfully", status: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in verify donation",
      status: false,
    });
  }
};

module.exports.adminHeader = async (req, res, next) => {
  try {
    const adminDetails = req.admin;
    return res.json({ status: true, adminDetails: adminDetails });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in admin header",
      status: false,
    });
  }
};
