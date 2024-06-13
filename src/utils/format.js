export const formatMoney = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const totalPriceTour = (
  price_adult,
  price_child,
  quantityAdult,
  quantityChildren
) => {
  const total = price_adult * quantityAdult + price_child * quantityChildren;
  return formatMoney(total);
};
