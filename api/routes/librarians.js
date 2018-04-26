const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Librarian = require("../models/librarian");

router.get("/", (req, res, next) => {
  Librarian.find()
    .select("fname lname phoneNumber email _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
          librarian: docs.map(doc => {return {
            _id : doc._id,
            fname: doc.fname,
            lname: doc.lname,
            phoneNumber: doc.phoneNumber,
            email:doc.email
              }})
      };
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {

    const librarians = new Librarian({
      _id: mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
            phoneNumber: req.body.phoneNumber,
            email:req.body.email

    });
    return librarians.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Librarian stored",
      createdLibrarian: {
        _id: result._id,
        fname: result.fname,
      lname: result.lname,
      phoneNumber: result.phoneNumber,
      email:  result.email
      }
    })
  }).catch(er =>{
    console.log(er);
    res.status(500).json({
      error: er
    });
  });
});

router.get("/:librarianId", (req, res, next) => {
  const id = req.params.librarianId;
  Librarian.findById(id)
      .exec()
    .then(librarian => {
     if(!librarian){
       return res.status(404).json({
         message: "Librarian not found"
       });
     }
         res.status(200).json({
          librarian: librarian
         });
        }).catch(er => {
          res.status(500).json({
            error: er
          });
        });
    });
router.patch("/:librarianId", (req, res, next) => {
  const id = req.params.librarianId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Librarian.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
      message: "Updated"
  });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:librarianId", (req, res, next) => {
  const id = req.params.librarianId;
  Librarian.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Librarian deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
