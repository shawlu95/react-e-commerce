import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  } else if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  } else if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, loadingProduct: true };
  } else if (action.type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = action.payload.filter((item) => item.featured);
    return {
      ...state,
      loadingProduct: false,
      products: action.payload,
      featuredProducts,
    };
  } else if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, loadingProduct: false, loadingProductError: true };
  } else if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      loadingSingleProduct: true,
      loadingSingleProductError: false,
    };
  } else if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loadingSingleProduct: false,
      singleProduct: action.payload,
    };
  } else if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      loadingSingleProduct: false,
      loadingSingleProductError: true,
    };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
