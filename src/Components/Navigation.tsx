import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";

export function Navigation() {
  const { toggleBasket, basketQuantity } = useBasket();
  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/store">Store</Nav.Link>
          <Nav.Link href="/deals">Deals</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Button
          onClick={toggleBasket}
          style={{ width: "42px", height: "42px", position: "relative" }} //change to rem
          variant="success"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div
            className="rounded-circle bg-danger justify-content-center align-items-center d-flex"
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {basketQuantity}
          </div>
        </Button>
      </Container>
    </Navbar>
  );
}
