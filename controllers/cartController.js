// In-memory cart store for demonstration (replace with DB in production)
let userCarts = {};

exports.getCart = (req, res) => {
  const userId = req.user.id;
  const cart = userCarts[userId] || [];
  res.json(cart);
};

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  if (!userCarts[userId]) userCarts[userId] = [];
  const existing = userCarts[userId].find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    userCarts[userId].push({ productId, quantity });
  }
  res.json({ message: 'Item added to cart', cart: userCarts[userId] });
};

exports.updateCart = (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const { quantity } = req.body;
  if (!userCarts[userId]) return res.status(404).json({ message: 'Cart not found' });
  const item = userCarts[userId].find(i => i.productId === itemId);
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });
  item.quantity = quantity;
  res.json({ message: 'Cart updated', cart: userCarts[userId] });
};

exports.removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  if (!userCarts[userId]) return res.status(404).json({ message: 'Cart not found' });
  userCarts[userId] = userCarts[userId].filter(i => i.productId !== itemId);
  res.json({ message: 'Item removed', cart: userCarts[userId] });
}; 