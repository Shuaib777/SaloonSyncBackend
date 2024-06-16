const Saloons = require("../models/saloonsModel.js");

exports.createSaloon = async (req, res) => {
  try {
    const saloon = await Saloons.create(req.body);
    res.status(200).json(saloon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAll = async (req, res) => {
  try {
    const saloons = await Saloons.insertMany(req.body);
    res.status(200).json(saloons);
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
    // pagination and filtering
    let limit = 10;
    let { page = 1 } = req.query;
    let queryStr = JSON.stringify(req.query);

    // filter
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);

    let filter = {};

    if (queryObj.price) filter[`menu.menuItems.price`] = queryObj.price;

    if (queryObj.gender) filter[`menu.menuItems.gender`] = queryObj.gender;

    if (queryObj.category) filter["category"] = queryObj.category;

    // pagination
    const totalSaloons = await Saloons.find(filter).countDocuments();
    const totalPages = Math.ceil(totalSaloons / limit);

    if (page > totalPages)
      return res.status(200).json({
        totalSaloons,
        totalPages,
        currentPage: page,
        saloons: [],
        message: "No items available for this page",
      });

    const saloons = await Saloons.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalSaloons,
      totalPages,
      currentPage: page,
      saloons,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.searchSaloons = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(200).json([]);
    }

    const saloons = await Saloons.find({
      saloonName: { $regex: new RegExp(`.*${query}.*`, "i") },
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
exports.menu = async (req, res) => {
  try {
    const { query } = req.query;
    const { saloonId } = req.params;

    const result = await Saloons.findOne({
      saloonId,
    });

    const matchingMenuItems = result.menu.reduce((acc, category) => {
      let menuItems = [];
      let menuCategory = "";
      category.menuItems.forEach((element) => {
        if (element.menuName.toLowerCase().includes(query.toLowerCase())) {
          menuCategory = category.menuCategory;
          menuItems.push({ ...element._doc });
        }
      });
      if (menuCategory !== "") acc.push({ menuCategory, menuItems });
      return acc;
    }, []);

    res.status(200).json(matchingMenuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.pagination = async (req, res) => {
//   try {
//     const limit = 10;
//     const page = req.query.page || 1;

//     // using this also it is working totally fine
//     // const allSaloons = await Saloons.find();
//     // const totalSaloons = allSaloons.length;
//     // const totalPages = Math.ceil(totalSaloons / limit);

//     // if (page > totalPages)
//     //   return res.status(200).json({
//     //     totalSaloons,
//     //     totalPages,
//     //     currentPage: page,
//     //     saloons: [],
//     //     message: "No items available for this page",
//     //   });

//     // const saloons = allSaloons.slice((page - 1) * limit, page * limit);

//     // res.status(200).json({
//     //   totalSaloons,
//     //   totalPages,
//     //   currentPage: page,
//     //   saloons,
//     // });

//     const totalSaloons = await Saloons.countDocuments();
//     const totalPages = Math.ceil(totalSaloons / limit);

//     if (page > totalPages)
//       return res.status(200).json({
//         totalSaloons,
//         totalPages,
//         currentPage: page,
//         saloons: [],
//         message: "No items available for this page",
//       });

//     const saloons = await Saloons.find()
//       .skip((page - 1) * limit)
//       .limit(limit);

//     return res.status(200).json({
//       totalSaloons,
//       totalPages,
//       currentPage: page,
//       saloons,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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
