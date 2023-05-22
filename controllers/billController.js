const billModel = require("../models/billModel");

const getBillController = async (req, res) => {
  try {
    const bills = await billModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};

const addBillController = async (req, res) => {
  try {
    const newBill = new billModel({...req.body});
    await newBill.save();
    res.status(201).send("Bill Created Successfully!");
  } catch (error) {
    res.send("Error Boss");
    console.log(error);
  }
};

module.exports = { addBillController, getBillController };