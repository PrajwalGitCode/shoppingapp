import Product from "../models/Product.js";

// ✅ Get only current user's products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// ✅ Add new product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const product = new Product({
      name,
      price,
      description,
      image,
      user: req.user._id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

// ✅ Update product (only owner)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check ownership safely
    if (!product.user || product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own product" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// ✅ Delete product (only owner)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure product.user is defined
    if (!product.user) {
      return res.status(500).json({ message: "Product user info missing" });
    }

    // Check if the logged-in user owns this product
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own product" });
    }

    // Delete product
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};


// controllers/productController.js
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching your products", error: err.message });
  }
};
