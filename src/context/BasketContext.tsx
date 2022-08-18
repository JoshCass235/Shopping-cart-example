import { useContext, createContext, ReactNode, useState } from "react";
import { isTemplateExpression } from "typescript";
import { Basket } from "../Components/Basket";
import { useLocalStorage } from "../customHooks/useLocalStorage";

type BasketProviderProps = {
  children: ReactNode;
};

type BasketContext = {
  toggleBasket: () => void;
  basketQuantity: number;
  basketItems: BasketItem[];
  getProductQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromBasket: (id: number) => void;
};

export type BasketItem = {
  id: number;
  quantity: number;
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}

export function BasketProvider({ children }: BasketProviderProps) {
  const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>(
    "Basket",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const toggleBasket = () => setIsOpen(!isOpen);

  function getProductQuantity(id: number): number {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: number) {
    setBasketItems((currentBasket) => {
      if (currentBasket.find((item) => item.id === id) == null) {
        return [...currentBasket, { id, quantity: 1 }];
      } else {
        return currentBasket.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantity(id: number) {
    setBasketItems((currentBasket) => {
      if (currentBasket.find((item) => item.id === id)?.quantity === 1) {
        return currentBasket.filter((item) => item.id !== id);
      } else {
        return currentBasket.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromBasket(id: number) {
    setBasketItems((currentBasket) => {
      return currentBasket.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        toggleBasket,
        basketQuantity,
        basketItems,
        getProductQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromBasket,
      }}
    >
      {children}
      <Basket isOpen={isOpen} />
    </BasketContext.Provider>
  );
}
