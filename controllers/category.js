const Category = require("../models/category");

exports.readAll = (req, res, next) => {
  Category.find()
    .select("categoryName")
    .then((category) => {
      if (category.length === 0) {
        return res.status(404).json({
          message: "No category found!",
        });
      }
      res.status(200).json({
        message: "Category fetched successfully",
        totalCategory: category.length,
        category: category,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.read = (req, res, next) => {
  Category.findById(req.params.categoryId)
    .select("categoryName")
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "No category found for this id!",
        });
      }
      res.status(200).json({
        message: "Category fetched successfully",
        category: category,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.create = (req, res, next) => {
  const category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.status(201).json({
        message: "Category Created Successfully.",
        category: category,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.update = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findByIdAndUpdate(categoryId, req.body, {
    new: true,
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({
          message: "No category found with this id.",
        });
      }
      res.status(200).json({
        message: "Category updated successfully.",
        category: category,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.delete = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findByIdAndDelete(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({
          message: "No category found with this id.",
        });
      }
      res.status(200).json({
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
