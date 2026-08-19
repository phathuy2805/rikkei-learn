import * as Product from '../models/Product.js';

export function getProducts(req, res) {
  try {
    const allProducts = Product.getAll();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createProduct(req, res) {
  try {
    const { name, price, quantity } = req.body;
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ error: 'Name, price, and quantity are required' });
    }
    const newProduct = Product.create({ name, price, quantity });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
