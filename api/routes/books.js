const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Author = require("../models/author");
const Book = require("../models/book");

router.get("/", (req, res, next) => {
  Book.find()
    .select("title releaseDate pages quantity author _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
          books: docs.map(doc => {return {

            _id : doc._id,
            title: doc.title,
            releaseDate: doc.releaseDate,
            pages: doc.pages,
            quantity:doc.quantity,
            author: doc.author
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
  

      const book = new Book({
        _id: mongoose.Types.ObjectId(),
              title: req.body.title,
              releaseDate: req.body.releaseDate,
              pages: req.body.pages,
              quantity:req.body.quantity,
              author:req.body.author

      });
      return book.save()  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Book stored",
      createdBook: {
        _id: result._id,
        title: result.title,
        releaseDate: result.releaseDate,
        pages: result.pages,
        quantity:result.quantity,
        author: result.author
      }
    })
  }).catch(er =>{
    console.log(er);
    res.status(500).json({
      error: er
    });
  });
});
router.post("/addAuthors/:bookId", (req, res, next) => {
  const id = req.params.bookId;

  if(mongoose.Types.ObjectId.isValid(req.body.author)) {

    Book.findByIdAndUpdate({_id: id},{$push : {author:req.body.author}}).then(result =>{
      res.status(200).json({
        message: "Author added"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});
router.post("/removeAuthors/:bookId", (req, res, next) => {
  const id = req.params.bookId;

  if(mongoose.Types.ObjectId.isValid(req.body.author)) {

    Book.findByIdAndUpdate({_id: id},{$pull : {author:req.body.author}}).then(result =>{
      res.status(200).json({
        message: "Author removed"
       });
    }).catch(err => {
      res.status(500).json({
        error: er
      });
    })

    
  }
    
});

router.get("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
      .exec()
    .then(book => {
     if(!book){
       return res.status(404).json({
         message: "Book not found"
       });
     }
     res.status(200).json({
      book: book
     });
    }).catch(er => {
      res.status(500).json({
        error: er
      });
    });
});

router.patch("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
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

router.delete("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
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
