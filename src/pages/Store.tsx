import { Col, Row } from "react-bootstrap";
import products from "../data/products.json";
import { Product } from "../Components/Product";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3}>
        {products.map((product) => (
          <Col key={product.id}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
