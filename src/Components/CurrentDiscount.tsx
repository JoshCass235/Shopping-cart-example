import {
  calculateBOGOFDiscount,
  calculateDirectDiscount,
  calculateSecondaryDiscount,
} from "../utilities/discounts";
import { BasketItem, useBasket } from "../context/BasketContext";
import { currencyFormatter } from "../utilities/currencyFormatter";

type CurrentDiscountProps = {
  discountName: string;
};
type getDiscountProps = {
  discountName: string;
  basketItems: BasketItem[];
};

export function CurrentDiscount({ discountName }: CurrentDiscountProps) {
  const { basketItems } = useBasket();
  const getQuanity = (id: number): number => {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  };

  switch (discountName) {
    case "Cheese discount": {
      if (getQuanity(3) > 1) {
        return (
          <div>
            Cheese Discount: -
            {currencyFormatter(calculateBOGOFDiscount(getQuanity(3), 3))}
          </div>
        );
      }
      return null;
    }
    case "Soup and bread discount": {
      if (getQuanity(1) > 0 && getQuanity(4) > 0) {
        return (
          <div>
            Soup and bread discount: -
            {currencyFormatter(
              calculateSecondaryDiscount(getQuanity(4), getQuanity(1), 1)
            )}
          </div>
        );
      }
      return null;
    }
    case "Butter discount": {
      if (getQuanity(5) > 0) {
        return (
          <div>
            Butter discount: -
            {currencyFormatter(
              calculateDirectDiscount(getQuanity(5), 1 / 3, 5)
            )}
          </div>
        );
      }
      return null;
    }
    case "Tenner off": {
      return <div>-{currencyFormatter(10)}</div>;
    }
    default: {
      return null;
    }
  }
}

export function getDiscount(
  discountName: string,
  basketItems: BasketItem[]
): number {
  const getQuanity = (id: number): number => {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  };
  switch (discountName) {
    case "Cheese discount": {
      return calculateBOGOFDiscount(getQuanity(3), 3);
    }
    case "Soup and bread discount": {
      return calculateSecondaryDiscount(getQuanity(4), getQuanity(1), 1);
    }
    case "Butter discount": {
      return calculateDirectDiscount(getQuanity(5), 1 / 3, 5);
    }
    case "Tenner off": {
      return 10;
    }
    default: {
      return 0;
    }
  }
}
