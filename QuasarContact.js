const express = require("express");
const router = express.Router();
const QuasarContact = require("../models/QuasarContact");
const multer = require("multer");
// const notification = require("../../libs/notification");
const moment = require("moment");
var request = require("request");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/");
  },
  filename: (req, file, cb) => {
    cb(null, "/Files/" + Date.now() + "_" + file.originalname);
    var imageName = "/" + Date.now() + "_" + file.originalname;
  },
});

router.post("/quasarConnect", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name, email, phone, projectBudget, projectDetail } = req.body;
  if (!name) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Name required.",
    });
  } else if (!email) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Email required.",
    });
  } else if (!phone) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Phone required.",
    });
  } else if (!projectBudget) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Project Budget required.",
    });
  } else if (!projectDetail) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Project Detail required.",
    });
  } else {
    const form = new QuasarContact({
      name: name,
      email: email,
      phone: phone,
      projectBudget: projectBudget,
      projectDetail: projectDetail,
      dateTime: moment().utcOffset("+05:30").format("DD/MM/YYYY HH:mm A"),
    });
    form.save().then(() => {
      // QuasarContact.find({}, (err, docs) => {
        res.status(200).json({
          responseCode: 200,
          responseMessage: 'Form successfully submitted',
          // data:docs,
        });
      // }).sort({ _id: -1 });
    });
  }
});

router.get("/getRecord", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  QuasarContact.find({}, (err, docs) => {
    res.status(200).json({
      responseCode: 200,
      responseMessage: 'Data fetch successfully.',
      data:docs,
    });
  }).sort({_id:-1}).limit(5)
})


// router.get("/getLast", (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');const express = require("express");
//   const router = express.Router();
//   const QuasarContact = require("../models/QuasarContact");
//   const multer = require("multer");
//   // const notification = require("../../libs/notification");
//   const moment = require("moment");
//   var request = require("request");
  
//   var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./assets/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, "/Files/" + Date.now() + "_" + file.originalname);
//       var imageName = "/" + Date.now() + "_" + file.originalname;
//     },
//   });
  
  
  
  // module.exports = router;
  
  // const { name, email, phone, projectBudget, projectDetail } = req.body;
  // if (!name) {
  //   res.status(400).json({
  //     responseCode: 400,
  //     responseMessage: "Name required.",
  //   });
  // } else if (!email) {
  //   res.status(400).json({
  //     responseCode: 400,
  //     responseMessage: "Email required.",
  //   });
  // } else if (!phone) {
  //   res.status(400).json({
  //     responseCode: 400,
  //     responseMessage: "Phone required.",
  //   });
  // } else if (!projectBudget) {
  //   res.status(400).json({
  //     responseCode: 400,
  //     responseMessage: "Project Budget required.",
  //   });
  // } else if (!projectDetail) {
  //   res.status(400).json({
  //     responseCode: 400,
  //     responseMessage: "Project Detail required.",
  //   });
  // } else {
  //   const form = new QuasarContact({
  //     name: name,
  //     email: email,
  //     phone: phone,
  //     projectBudget: projectBudget,
  //     projectDetail: projectDetail,
  //     dateTime: moment().utcOffset("+05:30").format("DD/MM/YYYY HH:mm A"),
  //   });
  //   form.save().then(() => {
  //     QuasarContact.find({}, (err, docs) => {
  //       res.status(400).json({
  //         responseCode: 400,
  //         responseMessage: docs,
  //       });
  //     }).sort({ _id: -1 });
  //   });
  // }
// });

module.exports = router;
