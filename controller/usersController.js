const Users = require("../models/usersModel.js");

exports.createUser = async (req, res) => {
  try {
    const users = await Users.create(req.body);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.readUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findOne({ userId: userId });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findOneAndUpdate({ userId }, req.body);

    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedUser = await Users.findOne({ userId: userId });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findOneAndDelete({ userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
