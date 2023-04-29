import * as types from "../types";

const initialState = {
  trips: [],
  drivers: [],
  totalPages: "",
  scheduledTrips: [],
  scheduledTrip: {},
};

const TripsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TRIPS:
      return {
        ...state,
        trips: payload.trips,
        drivers: payload.drivers,
      };

    case types.GET_SCHEDULED_TRIPS:
      return {
        ...state,
        scheduledTrips: payload,
      };

    case types.GET_SCHEDULED_TRIP:
      return {
        ...state,
        scheduledTrip: payload,
      };

    case types.GET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload,
      };

    default:
      return state;
  }
};

export default TripsReducer;
