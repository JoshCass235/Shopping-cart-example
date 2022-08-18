import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navigation } from "./Components/Navigation";
import { BasketProvider } from "./context/BasketContext";
import { Deals } from "./pages/Deals";

function App() {
  return (
    <BrowserRouter>
      <BasketProvider>
        <Navigation />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/deals" element={<Deals />} />
            <Route
              path="/about"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <About />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </BasketProvider>
    </BrowserRouter>
  );
}

export default App;
