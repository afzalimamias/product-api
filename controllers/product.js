const Product = require("../models/product");
const Category = require("../models/category");

exports.readAll = (req, res, next) => {
  Product.find()
    .select("-__v")
    .populate("categoryId", "categoryName")
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).json({ message: "No Product Found!" });
      }
      res.status(201).json({
        message: "Product fetched Successfully.",
        totalProducts: products.length,
        products: products,
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
  const categoryId = req.body.categoryId;
  if (categoryId) {
    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res
            .status(404)
            .json({ message: "No category exist for given category id" });
        }
        const product = new Product(req.body);
        return product.save();
      })
      .then((product) => {
        res.status(201).json({
          message: "Product Created Successfully.",
          product: product,
        });
      })
      .catch((err) => {
        if (!err.status) {
          err.status = 500;
        }
        next(err);
      });
  } else {
    const product = new Product(req.body);
    product
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Product Created Successfully.",
          product: result,
        });
      })
      .catch((err) => {
        if (!err.status) {
          err.status = 500;
        }
        next(err);
      });
  }
};

exports.read = (req, res, next) => {
  Product.findById(req.params.productId)
    .select("-__v")
    .populate("categoryId", "categoryName")
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "No Product found for this id.",
        });
      }
      res.status(200).json({
        message: "Product fetched successfully",
        product: product,
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
  const productId = req.params.productId;
  Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: "No product found with this id.",
        });
      }
      res.status(200).json({
        message: "Product updated successfully.",
        category: product,
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
  Product.findByIdAndDelete(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "No Product found for this id.",
        });
      }
      res.status(200).json({
        message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
