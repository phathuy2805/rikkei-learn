let products = [
  { id: 1, name: 'Laptop', price: 1500, quantity: 10 },
  { id: 2, name: 'Phone', price: 800, quantity: 20 }
];
let nextId = 3;

export function getAll() {
  return products;
}

export function create(data) {
  const newProduct = {
    id: nextId++,
    name: data.name,
    price: Number(data.price),
    quantity: Number(data.quantity)
  };
  products.push(newProduct);
  return newProduct;
}

export function findById(id) {
  return products.find(p => p.id === Number(id));
}
