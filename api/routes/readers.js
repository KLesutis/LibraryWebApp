const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Reader = require("../models/reader");
const Orders = require("../models/order");

router.get("/", (req, res, next) => {
  Reader.find()
    .select("fname lname phoneNumber email orders _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
          Readers: docs.map(doc => {
            return {
            _id : doc._id,
            fname: doc.fname,
            lname: doc.lname,
            phoneNumber: doc.phoneNumber,
            email:doc.email,
            orders: doc.orders
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

    const reader = new Reader({
      _id: mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
      phoneNumber: req.body.phoneNumber,
      email:req.body.email

    });
    return reader.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Reader stored",
      createdReader: {
        _id: result._id,
        fname: result.fname,
      lname: result.lname,
      phoneNumber: result.phoneNumber,
      email: result.email
      }
    })
  }).catch(er =>{
    console.log(er);
    res.status(500).json({
      error: er
    });
  });
});
router.post("/addOrder/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  if(mongoose.Types.ObjectId.isValid(req.body.order)) {

    Order.findByIdAndUpdate({_id: id},{$push : {orders:req.body.order}}).then(result =>{
      res.status(200).json({
        message: "Order added"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});
router.post("/removeOrder/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  if(mongoose.Types.ObjectId.isValid(req.body.order)) {

    Order.findByIdAndUpdate({_id: id},{$pull : {orders:req.body.order}}).then(result =>{
      res.status(200).json({
        message: "Order removed"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});
router.get("/:readerId", (req, res, next) => {
  const id = req.params.readerId;
  Reader.findById(id)
      .exec()
    .then(reader => {
     if(!reader){
       return res.status(404).json({
         message: "Reader not found"
       });
     }
     res.status(200).json({
      reader: reader
     });
    }).catch(er => {
      res.status(500).json({
        error: er
      });
    });
});

router.patch("/:readerId", (req, res, next) => {
  const id = req.params.readerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Reader.update({ _id: id }, { $set: updateOps })
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

router.delete("/:readerId", (req, res, next) => {
  const id = req.params.readerId;
  Reader.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Reader deleted"
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
