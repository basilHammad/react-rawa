import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import ScheduledTripComp from "../../../Components/ScheduledTrip/ScheduledTripComp";
import ScheduledTripModal from "../../../Components/ScheduledTripModal/ScheduledTripModal";
import { getCities, getEmployees } from "../../../store/actions/commonActions";
import {
  createScheduledTrip,
  getScheduledTrips,
} from "../../../store/actions/tripsActions";
import Login from "../../Login/Login";
import Header from "../Components/Header/Header";

import stl from "./ScheduledTrips.module.css";

const ScheduledTrips = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const totalPages = useSelector((state) => state.trips.totalPages);
  const drivers = useSelector((state) => state.common.employees);
  const cities = useSelector((state) => state.common.cities);
  const scheduledTrips = useSelector((state) => state.trips.scheduledTrips);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    tripName: "",
    driverId: "",
    time: "",
  });
  const [errors, setErrors] = useState({
    tripName: "",
    driverId: "",
    time: "",
    selectedDays: "",
    selectedCities: "",
    selectedAreas: "",
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [areasOptions, setAreasOptions] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
  };

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (selectedDays.includes(value)) {
      setSelectedDays((pre) => pre.filter((val) => val !== value));
      return;
    }

    setSelectedDays((pre) => [...pre, value]);

    setErrors((pre) => ({ ...pre, selectedDays: "" }));
  };

  const handleSubmit = () => {
    dispatch(
      createScheduledTrip(
        values,
        selectedDays,
        selectedCities,
        selectedAreas.map((area) => area.value),
        (id) => navigate(`/manage/scheduledTrip/${id}`)
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getEmployees(1, null, null, 10000, 1));
    dispatch(getCities());
    dispatch(getScheduledTrips());
  }, [isLoggedIn, navigate, page]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-scheduledTrips"))
      navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    if (!selectedCities) return;

    const selectedCity = cities.find((city) => city.id === selectedCities);

    setAreasOptions(selectedCity?.areas);
  }, [selectedCities]);

  return (
    <Layout manage>
      <Header
        isModal
        onClick={() => setShowModal(true)}
        title="الرحلات المجدولة"
        hideButton={!permissions?.includes("add-scheduledTrips")}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          <ScheduledTripModal
            showModal={showModal}
            closeModal={closeModal}
            values={values}
            errors={errors}
            handleFieldsChange={handleFieldsChange}
            drivers={drivers}
            setErrors={setErrors}
            handleDayChange={handleDayChange}
            selectedDays={selectedDays}
            selectedCities={selectedCities}
            selectedAreas={selectedAreas}
            setSelectedCities={setSelectedCities}
            setSelectedAreas={setSelectedAreas}
            handleSubmit={handleSubmit}
            cities={cities}
            areasOptions={areasOptions}
          />
          {scheduledTrips.map((trip) => {
            return (
              <ScheduledTripComp
                key={trip.id}
                name={trip.name}
                city={trip.city}
                areas={trip.areas.map((area) => area?.name)}
                days={trip.days}
                driverName={trip.driver}
                id={trip.id}
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
    </Layout>
  );
};

export default ScheduledTrips;
