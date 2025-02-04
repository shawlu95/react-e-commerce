import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = Math.max(...action.payload.map((p) => p.price));
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice,
        price: maxPrice,
      },
    };
  } else if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  } else if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  } else if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  } else if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filteredProducts: tempProducts };
  } else if (action.type === UPDATE_FILTERS) {
    // set [property] dynamically
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  } else if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let filteredProducts = [...allProducts];

    if (text) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      );
    }

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (company !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.company === company
      );
    }

    if (color !== 'all') {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.includes(color)
      );
    }

    // price filter is always applied
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= price
    );

    if (shipping) {
      filteredProducts = filteredProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filteredProducts };
  } else if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
