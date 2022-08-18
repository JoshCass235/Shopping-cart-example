import { Button, Stack } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";
import products from "../data/products.json";
import { currencyFormatter } from "../utilities/currencyFormatter";

type BasketItemProps = {
  id: number;
  quantity: number;
};

export function BasketItem({ id, quantity }: BasketItemProps) {
  const { removeFromBasket } = useBasket();
  const product = products.find((item) => item.id === id);

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex allign-items-center"
    >
      <img
        src={product?.imgUrl}
        style={{ width: "100px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {product?.name}
          <span className="text-muted" style={{ fontSize: "0.7rem" }}>
            {" "}
            x {quantity}
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: "1rem" }}>
          {currencyFormatter(product?.price || 0)}
        </div>
      </div>
      <div>{currencyFormatter((product?.price || 0) * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromBasket(product?.id || 0)}
      >
        &times;
      </Button>
    </Stack>
  );
}
