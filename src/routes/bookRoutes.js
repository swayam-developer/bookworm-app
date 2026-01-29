import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

// post books
router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!image || !title || !caption || !rating)
      return res.status(400).json({ message: "Please provide all fields" });

    // upload image to cloudinary
    const uploadResonse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResonse.secure_url;

    //    save to db
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding book",
      error: error.message,
    });
  }
});

// const response = await fetch("http://localhost:3000/api/books?page=3&limit=5");

// pagination => infinite loading
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 }) //desc
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      message: "Books fetched successfully",
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
});

// get recommended books
router.get("/user", protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "User's books fetched successfully",
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching user's books",
      error: error.message,
    });
  }
});

// delete book
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
});

export default router;
