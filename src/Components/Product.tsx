import { Button, Card } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";
import { currencyFormatter } from "../utilities/currencyFormatter";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function Product({ id, name, price, imgUrl }: ProductProps) {
  const {
    getProductQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromBasket,
  } = useBasket();
  const quantity = getProductQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="Top"
        src={imgUrl}
        height="250px"
        style={{ objectFit: "cover" }}
      ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between">
          <span className="fs-4">{name}</span>
          <span className="ms-2 text-muted">{currencyFormatter(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseQuantity(id)}>
              Add To Basket
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "5px" }} //change to rem?
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "5px" }}
              >
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
                <div className="fs-5">{quantity}</div>
                <Button onClick={() => increaseQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromBasket(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
