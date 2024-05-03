const Saloons = require("../models/saloonsModel.js");

exports.createSaloon = async (req, res) => {
  try {
    const saloon = await Saloons.create(req.body);
    res.status(200).json(saloon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.readSaloon = async (req, res) => {
  try {
    const { saloonId } = req.params;

    const saloon = await Saloons.findOne({ saloonId });
    res.status(200).json(saloon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.readSaloons = async (req, res) => {
  try {
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    console.log(queryObj);

    let filter = {};

    if (queryObj.price) filter[`menu.menuItems.price`] = queryObj.price;

    if (queryObj.category) filter["category"] = queryObj.category;

    const saloons = await Saloons.find(filter);

    res.status(200).json(saloons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.searchSaloons = async (req, res) => {
  try {
    const { query } = req.query;

    const saloons = await Saloons.find({
      saloonName: { $regex: query },
    });

    res.status(200).json(saloons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.searchMultiple = async (req, res) => {
  try {
    const { query } = req.query;

    const saloons = await Saloons.find({
      $or: [{ saloonName: { $regex: query } }, { address: { $regex: query } }],
    });

    res.status(200).json(saloons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.searchMenu = async (req, res) => {
  try {
    const { query } = req.query;
    const { saloonId } = req.params;

    const result = await Saloons.find(
      {
        saloonId,
        "menu.menuItems.menuName": { $regex: query },
      },
      {
        "menu.menuItems": 1,
        _id: 0,
      }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSaloon = async (req, res) => {
  try {
    const { saloonId } = req.params;

    const saloon = await Saloons.findOneAndUpdate({ saloonId }, req.body);

    if (!saloon) return res.status(404).json({ message: "saloon not found" });
    res.status(200).json(saloon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteSaloon = async (req, res) => {
  try {
    const { saloonId } = req.params;

    const saloon = await Saloons.findOneAndDelete({ saloonId });

    if (!saloon) return res.status(404).json({ message: "saloon not found" });
    res.status(200).json(saloon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
