import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Header from "../Components/Header/Header";

import Login from "../../Login/Login";
import {
  getTrips,
  createTrip,
  assignDriver,
} from "../../../store/actions/tripsActions";

import stl from "./Trips.module.css";
import Trip from "../../../Components/Trip/Trip";
import Modal from "../../../Components/Modal/Modal";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Components/Pagination/Pagination";

const Trips = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const trips = useSelector((state) => state.trips.trips);
  const totalPages = useSelector((state) => state.trips.totalPages);
  const drivers = useSelector((state) => state.trips.drivers);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const loading = useSelector((state) => state.common.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
    setSelectedDriverId(null);
    setSelectedTripId(null);
  };

  const handleOpenModal = (id) => {
    setShowModal(true);
    setSelectedTripId(id);
  };

  const handleDriverChange = (e) => {
    setSelectedDriverId(e.target.value);
  };

  const handleAssignDriver = () => {
    dispatch(
      assignDriver(
        selectedTripId,
        selectedDriverId,
        () => {},
        () => {
          setSelectedDriverId(null);
          setSelectedTripId(null);
          setShowModal(false);
          dispatch(getTrips(page));
        }
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getTrips(page));
  }, [isLoggedIn, navigate, page]);

  return isAdmin ? (
    <Layout manage>
      <Header path="/manage/trip/add" title="الرحلات" />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {trips.map((trip) => {
            return (
              <Trip
                key={trip.id}
                name={trip.trip_name}
                total={trip.total_price}
                date={trip.trip_delivery_date}
                orders={trip?.orders_ids}
                driverName={trip.driver_name}
                tripId={trip.id}
                showModal={handleOpenModal}
              />
            );
          })}
          {totalPages > 1 && (
            <Pagination
              totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
              currentPage={page}
              loading={loading}
              setCurrentPage={setPage}
              className={stl.pagination}
            />
          )}
        </div>
      )}
      <Modal show={showModal} close={closeModal}>
        <div className={stl.modalWrapper}>
          <strong>السائقين: </strong>
          <div className={stl.radioGroup}>
            {drivers.map((driver, i) => {
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="driver"
                    value={driver.id}
                    onChange={handleDriverChange}
                    checked={driver.id == selectedDriverId}
                  />
                  <span></span>
                  {driver.full_name}
                </label>
              );
            })}
          </div>
          <MainBtn
            loading={postLoading}
            onClick={handleAssignDriver}
            className={stl.submitBtn}
          >
            ربط
          </MainBtn>
        </div>
      </Modal>
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Trips;
