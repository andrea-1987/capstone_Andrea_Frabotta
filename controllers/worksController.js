const WorksModel = require("../models/works");

exports.cloudUploadWorks=async(req,res)=>{
    try {
        res.status(200).json({source:req.file.path})
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"file update error"
        })
    }
}

exports.getWorks = async (req, res) => {
  const {page=1,pageSize=4}=req.query
  try {
    const works = await WorksModel.find()
        .limit(pageSize)
        .skip((page-1)*pageSize)
        .sort({pubDate:-1})
     
    const totalWorks =await WorksModel.countDocuments();   
    
    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages:Math.ceil(totalWorks/pageSize),
      statusCode: 200,
      payload: works,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getSingleWork = async (req, res) => {
  const { id } = req.params;
  try {
    const work = await WorksModel.findById(id);
    res.status(200).send({
      statusCode: 200,
      message: `Works with id ${id} correctly found`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.addWork = async (req, res) => {
  const newWork = new WorksModel({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    location:req.body.location
  });
  try {
    await newWork.save();
    res.status(201).send({
      statusCode: 201,
      message: "Work successfully added",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.updateWork = async (req, res) => {
  const { id } = req.params;
  const work = await WorksModel.findById(id);
  if (!work) {
    return res.status(400).send({
      statusCode: 400,
      message: "The request work not exist!",
    });
  }
  try {
    const updatedData = req.body;
    const options = { new: true };

    const result = await WorksModel.findByIdAndUpdate(id, updatedData, options);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.deleteWork = async (req, res) => {
  const { id } = req.params;

  try {
    const work = await WorksModel.findByIdAndDelete(id);
    if (!work) {
      res.status(400).send({
        statusCode: 400,
        message: `work with id ${id} not exist`,
      });
    }
    res.status(200).send(`Work with id ${id} successfully removed`);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
