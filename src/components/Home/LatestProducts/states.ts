export const intialState: {
  isHeartClick: boolean;
  isProductClick: boolean;
  isCartClick: boolean;
} = {
  isHeartClick: false,
  isProductClick: false,
  isCartClick: false,
};
export const reducer = (
  state: {
    isHeartClick: boolean;
    isProductClick: boolean;
    isCartClick: boolean;
  },
  action: {
    type: string;
  }
) => {
  switch (action.type) {
    case "HeartClick":
      return {
        ...state,
        isHeartClick: !state.isHeartClick,
      };
    case "productClicked":
      return {
        ...state,
        isProductClick: !state.isProductClick,
      };
    case "cartClick":
      return {
        ...state,
        isCartClick: !state.isCartClick,
      };
    default:
      return state;
  }
};
