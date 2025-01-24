export const intialState: {
  isHeartClick: boolean;
  isEyeClick: boolean;
  isCartClick: boolean;
} = {
  isHeartClick: false,
  isEyeClick: false,
  isCartClick: false,
};
export const reducer = (
  state: {
    isHeartClick: boolean;
    isEyeClick: boolean;
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
    case "eyeClicked":
      return {
        ...state,
        isEyeClick: !state.isEyeClick,
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
