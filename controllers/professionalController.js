const ProfessionalModel = require("../models/professionals");
const bcrypt = require("bcrypt");

exports.getProfessional = async (req, res) => {
  try {
    const professionals = await ProfessionalModel.find();
    res.status(200).send({
      statusCode: 200,
      payload: professionals,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getSingleProfessional = async (req, res) => {
  const { id } = req.params;
  try {
    const professional = await ProfessionalModel.findById(id);
    res.status(200).send({
      statusCode: 200,
      message: `Professional with id ${id} correctly found`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.addProfessional = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newProfessional = new ProfessionalModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    age: Number(req.body.age),
    job: req.body.job,
  });
  try {
    await newProfessional.save();
    res.status(201).send({
      statusCode: 201,
      message: "Professional successfully create",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.updateProfessional = async (req, res) => {
  const { id } = req.params;
  const user = await ProfessionalModel.findById(id);
  if (!user) {
    return res.status(404).send({
      statusCode: 404,
      message: "The requested professional not exist!",
    });
  }
  try {
    const updatedData = req.body;
        const options = { new: true };

        const result = await ProfessionalModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
  } catch (error) {
    res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
  }
};

exports.deleteProfessional = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await ProfessionalModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `The professional with id ${id} not exist`,
      });
    }
    res.status(200).send(`Professional with id ${id} successfully removed`);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
