import products from "../data/products.json";

function getPrice(id: number): number {
  const product = products.filter((item) => item.id === id);
  const price = product.map(function (i) {
    return i.price;
  })[0];
  return price;
}

export function calculateDirectDiscount(
  quantity: number,
  discount: number,
  id: number
): number {
  return quantity * getPrice(id) * discount;
}

export function calculateBOGOFDiscount(quantity: number, id: number): number {
  return Math.floor(quantity / 2) * getPrice(id);
}

export function calculateSecondaryDiscount(
  primaryQuanity: number,
  secondaryQuantity: number,
  secondaryId: number
): number {
  if (primaryQuanity >= secondaryQuantity) {
    return (getPrice(secondaryId) / 2) * secondaryQuantity;
  } else {
    return primaryQuanity * (getPrice(secondaryId) / 2);
  }
}
