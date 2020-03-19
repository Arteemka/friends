export const ITEMS_FETCH_DATA_SUCCESS = "ITEMS_FETCH_DATA_SUCCESS";
export const ITEMS_FILTER_FETCH_DATA_SUCCESS =
  "ITEMS_FILTER_FETCH_DATA_SUCCESS";
  export const CURRENT_PAGE = "CURRENT_PAGE";
  export const CURRENT_PAGES = "CURRENT_PAGES"
export const ITEMS_FETCH_DATA_ERROR = "ITEMS_FETCH_DATA_ERROR";
export const ITEMS_IS_LOADING = "ITEMS_IS_LOADING";

export const getData = () => {
 
  return dispatch => {
    return fetch(`http://localhost:8080/api/users`)
      .then(res => res.json())
      .then(data => {
        dispatch(getItems(data));
        dispatch(getItemsForFilter(data));
        dispatch(itemsIsLoading(false));
      })
      .catch(() => {
        dispatch(itemsIsLoading(false));
        dispatch(fetchDataError(true));
      });
  };
};

export const getItems = items => {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    payload: items
  };
};

export const getItemsForFilter = itemsFilter => {
  return {
    type: ITEMS_FILTER_FETCH_DATA_SUCCESS,
    payload: itemsFilter
  };
};

export const fetchDataError = error => {
  return {
    type: ITEMS_FETCH_DATA_ERROR,
    payload: error
  };
};

export function itemsIsLoading(bool) {
  return {
    type: ITEMS_IS_LOADING,
    isLoading: bool
  };
}

export const setPage = page => {
  return {
    type: CURRENT_PAGE,
    payload: page
  };
};

export const setPages = pages => {
  return {
    type: CURRENT_PAGES,
    payload: pages
  };
};