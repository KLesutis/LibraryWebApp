const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const Book = require("../models/book");
const Librarian = require("../models/librarian");
const Reader = require("../models/reader");
const Order = require("../models/order");

router.get("/", (req, res, next) => {
    Order.find()
    .select("books librarian reader returnDate takenDate _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
          orders: docs.map(doc => {return {
            _id : doc._id,
            reader: doc.reader,
            librarian: doc.librarian,
            returnDate: doc.returnDate,
            takenDate:doc.takenDate,
            books:doc.books
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

    Book.findById(req.body.bookId)
    .then( book => {
      if(!book){
        return res.status(404).json({
          message: "Book not found"
        });
      }
      Librarian.findById(req.body.librarianId)
      .then( librarian => {
        if(!librarian){
          return res.status(404).json({
            message: "Librarian not found"
          });
        }
        Reader.findById(req.body.readerId)
        .then( reader => {
          if(!reader){
            return res.status(404).json({
              message: "Reader not found"
            });
          }
        })
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            reader: req.body.reader,
            librarian: req.body.librarian,
            returnDate: req.body.returnDate,
            takenDate:req.body.takenDate,
            books:req.body.books
      
          });
          return order.save();
      })
      
    
  })
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        reader: result.reader,
        librarian: result.librarian,
        returnDate: result.returnDate,
        takenDate:result.takenDate,
        books:result.books
      }
    })
  }).catch(er =>{
    console.log(er);
    res.status(500).json({
      error: er
    });
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
      .exec()
    .then(order => {
     if(!order){
       return res.status(404).json({
         message: "Order not found"
       });
     }
     res.status(200).json({
        order: order
     });
    }).catch(er => {
      res.status(500).json({
        error: er
      });
    });
});

router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Author.update({ _id: id }, { $set: updateOps })
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

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted"
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
