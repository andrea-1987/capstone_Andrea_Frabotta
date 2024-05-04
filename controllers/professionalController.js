const ProfessionalModel = require("../models/professionals");
const bcrypt = require("bcrypt");

exports.getProfessional = async (req, res) => {
  try {
    const professionals = await ProfessionalModel.find();
    res.status(200).send({
      statusCode: 200,
      payload: professionals
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// exports.getSingleProfessional = async (req, res) => {
//   const { id } = req.params;
//   const { page = 1, pageSize = 3 } = req.query;

//   try {
//     const professional = await ProfessionalModel.findById(id);

//     if (!professional) {
//       return res.status(404).send({
//         statusCode: 404,
//         message: `Professional with id ${id} not found`,
//       });
//     }

//     const preferWorks = await ProfessionalModel.find(
//       { _id: id },
//       { preferWorks: { $slice: [(page - 1) * pageSize, pageSize] } }
//     );

//     const totalPreferWorks = professional.preferWorks.length;

//     res.status(200).send({
//       currentPage: page,
//       pageSize,
//       totalPages: Math.ceil(totalPreferWorks / pageSize),
//       statusCode: 200,
//       message: `User with id ${id} correctly found`,
//       payload: professional
//     });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).send({
//       statusCode: 500,
//       message: "Internal server error",
//     });
//   }
// };

exports.getSingleProfessional = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 3 } = req.query;

  try {
    const professional = await ProfessionalModel.findById(id);

    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with id ${id} not found`,
      });
    }

    const preferWorks = await ProfessionalModel.find(
      { _id: id },
      { preferWorks: { $slice: [(page - 1) * pageSize, pageSize] } }
    );

    const myWorks = await ProfessionalModel.find(
      { _id: id },
      { myWorks: { $slice: [(page - 1) * pageSize, pageSize] } }
    );

    const totalPreferWorks = professional.preferWorks.length;
    const totalMyWorks = professional.myWorks.length;

    const payload = {
      ...professional.toObject(),
      preferWorks,
      myWorks,
    };

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalPreferWorks / pageSize),
      statusCode: 200,
      message: `User with id ${id} correctly found`,
      payload,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};


exports.getMyWorks = async (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 3 } = req.query;

  try {
    const professional = await ProfessionalModel.findById(id);

    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with id ${id} not found`,
      });
    }

    const myWorks = await ProfessionalModel.find(
      { _id: id },
      { myWorks: { $slice: [(page - 1) * pageSize, pageSize] } }
    );

    const totalMyWorks = professional.myWorks.length;

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalMyWorks / pageSize),
      statusCode: 200,
      message: `User with id ${id} correctly found`,
      payload: professional,myWorks
    });
  } catch (error) {
    console.error("Error fetching user:", error);
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
    job: req.body.job,
    preferWorks: req.body.preferWorks,
    myWorks: req.body.myWorks,
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

exports.addWorkToMyWorks = async (req, res) => {
  const { id } = req.params;
  const { workId } = req.body;

  try {
    const professional = await ProfessionalModel.findById(id);
    if (!professional) {
      return res.status(404).send({
        statusCode: 404,
        message: `Professional with ID ${id} not found`,
      });
    }

    professional.myWorks.push(workId);

    await professional.save();

    res.status(200).send({
      statusCode: 200,
      message: `Work with ID ${workId} added to myWorks of professional with ID ${id}`,
      payload: myWorks,
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

    const result = await ProfessionalModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
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
