import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// POST /api/checkout
export const checkout = async (req, res) => {
  try {
    const userId = req.user._id; // Auth middleware should set req.user
    const { selectedItems } = req.body; // Array of product IDs (optional)

    // 1️⃣ Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Filter items to checkout
    const itemsToBuy =
      selectedItems && selectedItems.length
        ? cart.items.filter((item) =>
            selectedItems.includes(item.product._id.toString())
          )
        : cart.items;

    if (!itemsToBuy.length) {
      return res.status(400).json({ message: "No items selected for checkout" });
    }

    // 3️⃣ Calculate total
    const total = itemsToBuy.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // 4️⃣ Create order
    let order = await Order.create({
      user: userId,
      items: itemsToBuy.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice: total,
      status: "Paid",
      orderedAt: new Date(),
    });

    // 5️⃣ Remove purchased items from cart
    cart.items = cart.items.filter(
      (item) =>
        !itemsToBuy.some((buyItem) =>
          buyItem.product._id.equals(item.product._id)
        )
    );
    await cart.save();

    // 6️⃣ Populate product references for frontend
    order = await Order.findById(order._id).populate("items.product");

    // 7️⃣ Send receipt
    res.status(200).json({
      success: true,
      receipt: {
        orderId: order._id,
        date: order.orderedAt,
        total: order.totalPrice,
        items: order.items, // each item now has product.name, product.price etc.
        status: order.status,
      },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
};
