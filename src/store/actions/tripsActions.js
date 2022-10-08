import fetcher from "../../config/axios";
import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

export const getTrips =
  (page = 1) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await fetcher.get(`/trips?page=${page}`);

      if (res.data.data) {
        dispatch({
          type: types.GET_TRIPS,
          payload: res.data.data,
        });

        dispatch({
          type: types.GET_TOTAL_PAGES,
          payload: res.data.meta.last_page,
        });
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const createTrip = (name, selectedIds, date, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const ids = selectedIds.map((id) => ({ orders_id: id }));

    const data = JSON.stringify({
      trip_name: name,
      orders_ids: ids,
      trip_delivery_date: date,
    });
    const res = await fetcher.post("/trips", data);

    if (res.status === 200) cb();

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const assignDriver =
  (tripId, driverId, setError, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    const data = JSON.stringify({
      driver_id: driverId,
    });

    try {
      const res = await fetcher.put(`/trips/${tripId}`, data);

      if (res.data) await cb();

      dispatch(setIsPostLoading(false));
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
      console.warn(error);
      dispatch(setIsPostLoading(false));
    }
  };
