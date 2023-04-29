import React, { useEffect } from "react";
import { useState } from "react";
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditTripPopup from "../../../../Components/EditTripPopup/EditTripPopup";

import Layout from "../../../../Components/Layout/Layout";
import Modal from "../../../../Components/Modal/Modal";
import Order from "../../../../Components/Order/Order";
import Login from "../../../Login/Login";
import Header from "../../Components/Header/Header";
import ValidateModal from "../../../../Components/ValidateModal/ValidateModal";

import stl from "./Trip.module.css";
import { deleteOrderFromTrip } from "../../../../store/actions/tripsActions";
import Loader from "../../../../Components/Loader/Loader";

const Trip = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const trips = useSelector((state) => state.trips.trips);
  const loading = useSelector((state) => state.common.isLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
  };

  const closeConfirmModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowConfirmModal(false);
    setSelectedOrderId(null);
  };

  const handleRemoveOrder = () => {
    dispatch(
      deleteOrderFromTrip(params.id, selectedOrderId, () => {
        setSelectedOrderId(null);
        setShowConfirmModal(false);
      })
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    if (!params.id || !trips.length) navigate("/manage/trips");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-trips")) navigate("/unauthorized");
  }, [permissions]);

  return (
    <Layout manage hideBeardcrumb={true}>
      <Header
        hideButton
        title={trips.find((trip) => trip.id == params.id)?.trip_name}
        showBack
        navigate={() => navigate("/manage/trips")}
        className={stl.header}
      />
      {location?.state?.isToday && permissions?.includes("edit-trips") && (
        <div className={stl.btnWrapper}>
          <button className={stl.link} onClick={() => setShowModal(true)}>
            <MdModeEditOutline size={22} />
            <span> تعديل</span>
          </button>
        </div>
      )}
      {/* <div className={stl.btnWrapper}>
        {location.state.isToday && (
          <button onClick={() => setShowModal(true)}>
            <MdAdd size={22} />
            <span>اضافة طلبات</span>
          </button>
        )}
      </div> */}

      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {trips
            .find((trip) => trip.id == params.id)
            ?.orders_ids?.map((item, i) => {
              return (
                <Order
                  item={item}
                  status={item.status}
                  orderId={item.id}
                  // editable={item.status == 2 || item.status == 1}
                  deletable={
                    trips.find((trip) => trip.id == params.id)?.orders_ids
                      .length > 1 &&
                    trips.find((trip) => trip.id == params.id)?.status != 3 &&
                    permissions?.includes("edit-trips")
                  }
                  onDelete={() => {
                    setShowConfirmModal(true);
                    setSelectedOrderId(item.id);
                  }}
                  key={item.id}
                  name={item?.customer?.name}
                  products={item?.order_products}
                  num={i + 1}
                  latLng={{
                    lat: item?.address?.location_lat,
                    lng: item?.address?.location_lng,
                  }}
                />
              );
            })}
        </div>
      )}
      <Modal show={showModal} close={closeModal}>
        <EditTripPopup
          tripsOrders={trips.find((trip) => trip.id == params.id)?.orders_ids}
          tripId={params.id}
          closeModal={closeModal}
          setShowModal={setShowModal}
        />
      </Modal>

      <Modal show={showConfirmModal} close={closeConfirmModal} validate>
        <ValidateModal
          handleValidate={handleRemoveOrder}
          closeModal={closeConfirmModal}
          isButtonDisabled={loading}
        />
      </Modal>
    </Layout>
  );
};

export default Trip;
