const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      default: mongoose.Types.ObjectId,
      unique: true,
      immutable: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
