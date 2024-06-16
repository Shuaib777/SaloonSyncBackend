const mongoose = require("mongoose");

const saloonsSchema = mongoose.Schema(
  {
    saloonId: {
      type: String,
      unique: true,
      immutable: true,
    },
    saloonName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    menu: [
      {
        menuCategory: {
          type: String,
          required: true,
        },
        menuItems: [
          {
            menuName: {
              type: String,
              required: true,
            },
            gender: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Saloons = mongoose.model("saloons", saloonsSchema);

module.exports = Saloons;
