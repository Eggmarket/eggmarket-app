export function priceWithDot(price) {
  if (price?.length < 4) {
    return price;
  } else {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
