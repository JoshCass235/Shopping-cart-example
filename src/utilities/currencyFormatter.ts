const formatCurrency = new Intl.NumberFormat(undefined, {
  currency: "GBP",
  style: "currency",
});

export function currencyFormatter(number: number) {
  return formatCurrency.format(number);
}
