import { Offcanvas, Stack } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { BasketItem } from "./BasketItem";
import products from "../data/products.json";
import { Discount, getTotalDiscount } from "./Discount";

type BasketProps = {
  isOpen: boolean;
};

export function Basket({ isOpen }: BasketProps) {
  const { toggleBasket, basketItems } = useBasket();

  return (
    <Offcanvas show={isOpen} placement="end" onHide={toggleBasket}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Header> Your Basket </Offcanvas.Header>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {basketItems.map((item) => (
            <BasketItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Subtotal{" "}
            {currencyFormatter(
              basketItems.reduce((total, basketItem) => {
                const item = products.find((item) => item.id === basketItem.id);
                const totalBeforeDiscount =
                  total + (item?.price || 0) * basketItem.quantity;
                return totalBeforeDiscount;
              }, 0)
            )}
          </div>
          <Discount />
          <div className="ms-auto fw-bold fs-4">
            Total{" "}
            {currencyFormatter(
              basketItems.reduce((total, basketItem) => {
                const item = products.find((item) => item.id === basketItem.id);
                const totalBeforeDiscount =
                  total + (item?.price || 0) * basketItem.quantity;
                return totalBeforeDiscount;
              }, 0) - getTotalDiscount(basketItems)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
