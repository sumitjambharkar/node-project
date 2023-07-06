const User = require("../model/User");
const Country = require("../model/Country");

const createForm = async (req, res) => {
  try {
    const { name, dateOfBirth, country } = req.body;
    const resume = req.file;
    if (!name || !dateOfBirth || !country || !resume) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const saveData = new User({
      name,
      dateOfBirth,
      country,
      resume:{
        data:resume.buffer,
        contentType:resume.mimetype,
        filename:resume.originalname,
        size:resume.size,
        encoding:resume.encoding,
      }
    });
    await saveData.save();
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving form data" });
  }
};

const fetchCountry = async (req, res) => {
  try {
    const data = await Country.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries." });
  }
};

const autoSuggestions = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Please provide a search name." });
    }
    const filteredCountries = await Country.find({
      name: { $regex: new RegExp(name, "i") },
    }).select("name");
    res.json(filteredCountries);
  } catch (error) {
    console.error("Error in /api/suggestions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const userList = async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  }
};

const searchUser = async (req, res) => {
  try {
    const { name, createdAt } = req.query;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    if (createdAt) {
      query.createdAt = createdAt;
    }
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error." });
  }
};

const userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findById({ _id: id });
    res.json({ message: "Get User", userDetail });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const userDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const removeUser = await User.findByIdAndDelete({ _id: id });
    res.json({ message: "Delete User", removeUser });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const openPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await User.findById({ _id: id });
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const pdfData = userId.resume.data;
      res.setHeader("Content-Type",userId.resume.contentType);
      res.send(pdfData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  createForm,
  fetchCountry,
  autoSuggestions,
  userList,
  searchUser,
  userDelete,
  userDetails,
  openPdf,
};
