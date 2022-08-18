import { Card } from "react-bootstrap";
import { currentPromotions } from "../data/promotions";
import { CurrentDiscount, getDiscount } from "./CurrentDiscount";
import { BasketItem, useBasket } from "../context/BasketContext";
import { currencyFormatter } from "../utilities/currencyFormatter";
export function getTotalDiscount(basketItems: BasketItem[]): number {
  let totalDiscount = 0;
  currentPromotions.map(function (currentPromotion) {
    totalDiscount = totalDiscount += getDiscount(currentPromotion, basketItems);
  });
  return totalDiscount;
}
export function Discount() {
  const { basketItems } = useBasket();
  if (basketItems.length !== 0)
    return (
      <Card border="light" text="danger">
        <Card.Body>
          <Card.Text>
            {currentPromotions.map(function (currentPromotion) {
              return <CurrentDiscount discountName={currentPromotion} />;
            })}
          </Card.Text>
          <Card.Text style={{ textAlign: "right", fontSize: "1.2rem" }}>
            {" "}
            Total Discount: -{currencyFormatter(
              getTotalDiscount(basketItems)
            )}{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  return null;
}
