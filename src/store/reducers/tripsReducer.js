import * as types from "../types";

const initialState = {
  trips: [],
  drivers: [],
  totalPages: "",
};

const TripsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TRIPS:
      return {
        ...state,
        trips: payload.trips,
        drivers: payload.drivers,
      };

    case types.GET_TOTAL_PAGES:
      console.log("payload", payload);
      return {
        ...state,
        totalPages: payload,
      };

    default:
      return state;
  }
};

export default TripsReducer;
