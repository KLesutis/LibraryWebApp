const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Author = require("../models/author");
const Book = require("../models/book");

router.get("/", (req, res, next) => {
  Author.find()
    .select("fname lname pseudonym birthDate deadDate books _id")
    .populate('books', 'title')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
          authors: docs.map(doc => {return {

            _id : doc._id,
            fname: doc.fname,
            lname: doc.lname,
            pseudonym: doc.pseudonym,
            birthDate:doc.birthDate,
            deadDate: doc.deadDate,
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
  
    const author = new Author({
      _id: mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
      pseudonym: req.body.pseudonym,
      birthDate:req.body.birthDate,
      deadDate: req.body.deadDate
    })
    return author.save()
  
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Author stored",
      createdAuthor: {
        _id: result._id,
        fname: result.fname,
      lname: result.lname,
      pseudonym: result.pseudonym,
      birthDate: result.birthDate,
      deadDate: result.deadDate,
      books: result.books
      }
    })
  }).catch(er =>{
    console.log(er);
    res.status(500).json({
      error: er
    });
  });
});

router.get("/:authorId", (req, res, next) => {
  const id = req.params.authorId;
  Author.findById(id)
      .exec()
    .then(author => {
     if(!author){
       return res.status(404).json({
         message: "Author not found"
       });
     }
     res.status(200).json({
        author: author
     });
    }).catch(er => {
      res.status(500).json({
        error: er
      });
    });
});

router.patch("/:authorId", (req, res, next) => {
  const id = req.params.authorId;
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

router.post("/addBook/:authorId", (req, res, next) => {
  const id = req.params.authorId;

  if(mongoose.Types.ObjectId.isValid(req.body.book)) {

    Book.findByIdAndUpdate({_id: id},{$push : {books:req.body.books}}).then(result =>{
      res.status(200).json({
        message: "Book added"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});
router.post("/removeBook/:authorId", (req, res, next) => {
  const id = req.params.authorId;

  if(mongoose.Types.ObjectId.isValid(req.body.book)) {

    Author.findByIdAndUpdate({_id: id},{$pull : {books:req.body.author}}).then(result =>{
      res.status(200).json({
        message: "Book removed"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});

router.delete("/:authorId", (req, res, next) => {
  const id = req.params.authorId;
  Author.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Author deleted"
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
