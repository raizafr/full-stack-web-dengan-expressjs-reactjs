const db = require("../config/database");

// get all product
const getAllProduct = (req, res) => {
  const setQueryGetProduct = "SELECT * FROM products";
  db.query(setQueryGetProduct, (err, result) => {
    if (err) {
      res.status(500).json({ massage: "Internal server error" });
    } else {
      res.status(200).json({ massage: "get all product", data: result });
    }
  });
};

// selected product by id
const getProduct = (req, res) => {
  const productId = req.params.productId;
  const setQueryProduct = "SELECT * FROM products WHERE product_id=?";
  db.query(setQueryProduct, productId, (err, field) => {
    console.log(field);
    if (err) {
      res.status(500).json({ massage: "Internal server error" });
    } else if (field.length === 0) {
      res.status(404).json({ massage: "not found" });
    } else {
      res
        .status(200)
        .json({ massage: `get product from id ${productId}`, data: field });
    }
  });
};

// new product
const newProduct = (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || isNaN(price)) {
    res.status(400).json({ massage: "bad request" });
  } else {
    const setQueryNewProduct =
      "INSERT INTO products (name,description,price) VALUES (?,?,?)";
    db.query(setQueryNewProduct, [name, description, price], (err, field) => {
      if (err) {
        res.status(500).json({ massage: "Internal server error" });
      } else {
        res.status(201).json({
          massage: "post new product success",
          data: {
            product_id: field.insertId,
            name: name,
            description: description,
            price: price,
          },
        });
      }
    });
  }
};

// edit product
const editProduct = (req, res) => {
  const { name, description, price } = req.body;
  const productId = req.params.productId;
  if (!name || !description || isNaN(price)) {
    res.status(400).json({ massage: "bad request" });
  } else {
    const setQueryEditProduct =
      "UPDATE products SET name=?, description = ?, price=? WHERE products_id=?";
    db.query(
      setQueryEditProduct,
      [name, description, price, productId],
      (err, field) => {
        if (err) {
          res.status(500).json({ massage: "Internal server error" });
        } else if (field.affectedRows === 0) {
          res.status(404).json({ massage: "not found" });
        } else {
          res.status(201).json({
            massage: "edit product success",
            data: field,
          });
        }
      }
    );
  }
};

module.exports = { newProduct, getAllProduct, editProduct, getProduct };
