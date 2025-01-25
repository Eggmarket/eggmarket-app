export const formatPrice = (value) => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, "");
  // Add commas as thousand separators
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
