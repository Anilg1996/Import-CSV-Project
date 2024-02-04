const userModel = require("../model/userModel");
const mongoose = require('mongoose');
const csv = require("csvtojson");
const { isValidEmail, isValidPhone } = require("../middleware/validation")

// --------------------------- Uploads User CSV File ------------------------------------------
const importUser = async (req, res) => {
  try {
    const userData = [];
    const response = await csv().fromFile(req.file.path);

    for (let x = 0; x < response.length; x++) {
      const { FullName, Contact, Email, DateOfBirth } = response[x];

      // Validate and sanitize phone
      if (!Contact) {
        return res.status(400).send({ status: false, message: "Phone is required" });
      }
      const validatedPhone = Contact.trim();
      if (!isValidPhone(validatedPhone)) {
        return res.status(400).send({ status: false, message: "Please provide a valid Phone Number" });
      }
      const uniquePhone = await userModel.findOne({ Contact: validatedPhone });
      if (uniquePhone) {
        return res.status(400).send({ status: false, message: "Phone is already exist" });
      }

      // Validate and sanitize email
      if (!Email) {
        return res.status(400).send({ status: false, message: "Email is required" });
      }
      const validatedEmail = Email.trim().toLowerCase();
      if (!isValidEmail(validatedEmail)) {
        return res.status(400).send({ status: false, message: "Please provide a valid Email-Id" });
      }
      const uniqueEmail = await userModel.findOne({ Email: validatedEmail });
      if (uniqueEmail) {
        return res.status(400).send({ status: false, message: "Email is already exist" });
      }

      userData.push({
        FullName: FullName, // Use the destructured variable here
        Contact: validatedPhone,
        Email: validatedEmail,
        DateOfBirth: DateOfBirth,
      });
    }

    await userModel.insertMany(userData);
    res.status(200).send({ status: true, message: "CSV imported successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// ----------------------------- Get All User Data ---------------------------------------------
const getUserList = async (req, res) => {
  try {
    const getuser = await userModel.find({});
    res.status(200).send({ status: true, message: "User list", getuser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// ------------------------------ Update User Data ---------------------------------------------
const updateUserList = async (req, res) => {
  try {
    const _id = req.params._id;
    const { FullName, Contact, Email, DateOfBirth} = req.body;

    // Check if the provided _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send({ status: false, message: "Invalid _id format" });
    }

    // Check if the user with the specified _id exists
    const existingUser = await userModel.findById(_id);
    if (!existingUser) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    // If the user exists, proceed with the update
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { FullName, Contact, Email, DateOfBirth },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({ status: false, message: "Failed to update user" });
    }

    res.status(200).send({ status: true, message: "Update successful", updatedUser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// ------------------------------------- Delete User Data -------------------------------------
const deleteUser = async (req, res) => {
  try {
    const _id = req.params._id;

    // Check if the user with the specified _id exists
    const existingUser = await userModel.findById(_id);
    if (!existingUser) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    // If the user exists, proceed with deletion
    const deleteResult = await userModel.deleteOne({ _id });

    if (deleteResult.deletedCount > 0) {
      res.status(200).send({ status: true, message: "Delete successfully" });
    } else {
      res.status(500).send({ status: false, message: "Failed to delete user" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


module.exports = { importUser, getUserList, updateUserList, deleteUser };
