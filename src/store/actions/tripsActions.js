import fetcher from "../../config/axios";
import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

export const getTrips =
  (page = 1, all) =>
  async (dispatch) => {
    //&all=1
    dispatch(setIsLoading(true));
    try {
      const res = await fetcher.get(
        `/trips?page=${page}${all ? "&all=1" : ""}&perPage=16`
      );

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

export const editTrip = (id, selectedIds, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const ids = selectedIds.map((id) => ({ orders_id: id }));

    const data = JSON.stringify({
      orders_ids: ids,
    });
    const res = await fetcher.put(`/trips/${id}`, data);

    if (res.status === 200) {
      await dispatch(getTrips(1, true));
      cb();
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const deleteOrderFromTrip =
  (tripId, orderId, cb) => async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      // deleteOrder / { trip_id } / { order_id }; //delete
      const res = await fetcher.delete(`deleteOrder/${tripId}/${orderId}`);

      if (res.status === 200) {
        await dispatch(getTrips(1, true));
        cb();
      }

      dispatch(setIsLoading(false));
    } catch (error) {}
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

export const createScheduledTrip =
  (values, selectedDays, selectedCities, selectedAreas, cb) =>
  async (dispatch) => {
    dispatch(setIsPostLoading(true));
    try {
      const data = JSON.stringify({
        name: values.tripName,
        driver_id: values.driverId,
        delivery_date: values.time,
        days: selectedDays,
        area_ids: selectedAreas,
        city_id: selectedCities,
      });

      const res = await fetcher.post("/trips-scheduled", data);
      if (res.data.data.id) cb(res.data.data.id);
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
    }
  };

export const getScheduledTrips = (page) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get(`/trips-scheduled?page=${page}`);

    if (res.data.data) {
      dispatch({
        type: types.GET_SCHEDULED_TRIPS,
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

export const getScheduledTripById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get(`/trips-scheduled/${id}`);

    if (res.data.data) {
      dispatch({
        type: types.GET_SCHEDULED_TRIP,
        payload: res.data.data,
      });
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const editScheduledTrip =
  (
    id,
    selectedClients,
    cb,
    values,
    selectedDays,
    selectedAreas,
    selectedCities
  ) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const data = JSON.stringify({
        name: values.tripName,
        customer_ids: selectedClients,
        days: selectedDays,
        driver_id: values.driverId,
        delivery_date: values.time,
        area_ids: selectedAreas,
        city_id: selectedCities,
      });

      const res = await fetcher.put(`/trips-scheduled/${id}`, data);

      if (res.data.data) {
        await dispatch(getScheduledTripById(id));
        cb();
      }

      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
    }
  };

export const Deltest = () => async (dispatch) => {
  const res = await fetcher.delete("/trips-scheduled/7");
};
