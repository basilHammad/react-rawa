import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../../Components/Layout/Layout";
import Order from "../../../../Components/Order/Order";
import Login from "../../../Login/Login";
import Header from "../../Components/Header/Header";

import stl from "./Trip.module.css";

const Trip = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const trips = useSelector((state) => state.trips.trips);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    if (!params.id || !trips.length) navigate("/manage/trips");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  return isAdmin ? (
    <Layout manage hideBeardcrumb={true}>
      <Header
        hideButton
        title={trips.find((trip) => trip.id == params.id)?.trip_name}
        showBack
        navigate={() => navigate("/manage/trips")}
        className={stl.header}
      />
      <div className={stl.wrapper}>
        {trips
          .find((trip) => trip.id == params.id)
          ?.orders_ids?.map((item, i) => {
            return (
              <Order
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
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Trip;
