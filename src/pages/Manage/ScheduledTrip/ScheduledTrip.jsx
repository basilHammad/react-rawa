import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import {
  deleteTripTest,
  Deltest,
  editScheduledTrip,
  getScheduledTripById,
} from "../../../store/actions/tripsActions";
import Login from "../../Login/Login";
import Header from "../Components/Header/Header";
import Modal from "../../../Components/Modal/Modal";
import stl from "./ScheduledTrip.module.css";
import {
  getCities,
  getClients,
  getEmployees,
} from "../../../store/actions/commonActions";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import ScheduledTripModal from "../../../Components/ScheduledTripModal/ScheduledTripModal";
import ScheduledTripTable from "../../../Components/ScheduledTripTable/ScheduledTripTable";
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import AddClientsToTripsPopup from "../../../Components/AddClientsToTripsPopup/AddClientsToTripsPopup";

const ScheduledTrip = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const clients = useSelector((state) => state.common.clients);
  const trip = useSelector((state) => state.trips.scheduledTrip);
  const drivers = useSelector((state) => state.common.employees);
  const cities = useSelector((state) => state.common.cities);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const canEdit = permissions?.includes("edit-scheduledTrips");

  const [showCustomersModal, setShowCustomersModal] = useState(false);
  const [showModalTrip, setShowModalTrip] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
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
  const params = useParams();
  const dispatch = useDispatch();

  const handleCloseCustomersModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowCustomersModal(false);
  };

  const closeModalTrip = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModalTrip(false);
  };

  const handleCustomersModalSubmit = () => {
    dispatch(
      editScheduledTrip(
        params.id,
        selectedClients,
        () => setShowCustomersModal(false),
        values,
        selectedDays,
        selectedAreas.map((area) => area.value),
        selectedCities
      )
    );
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

  const handleModalTripSubmit = () => {
    dispatch(
      editScheduledTrip(
        params.id,
        selectedClients,
        () => setShowModalTrip(false),
        values,
        selectedDays,
        selectedAreas,
        selectedCities
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getScheduledTripById(params.id));
    dispatch(getClients(1, null, null, 10000));
    dispatch(getEmployees(1, null, null, 10000, 1));
    dispatch(getCities());
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-scheduledTrips"))
      navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    if (!Object.keys(trip).length) return;

    setSelectedClients(trip.customer_ids ? trip.customer_ids : []);
    setValues({
      tripName: trip?.name,
      driverId: trip?.driver_id,
      time: trip?.delivery_date,
    });
    setSelectedDays(trip?.days);
    setSelectedCities(trip?.city_id);
    setSelectedAreas(
      trip?.areas.map((area) => {
        console.log(area);
        return { value: area?.id, label: area?.name };
      })
    );
  }, [trip]);

  useEffect(() => {
    if (!selectedCities) return;

    const selectedCity = cities.find((city) => city.id === selectedCities);

    setAreasOptions(selectedCity?.areas);
  }, [selectedCities]);

  const tableContent = trip?.customers?.length
    ? {
        header: ["#", "العملاء", "الموقع"],
        data: trip.customers.map((customer, i) => {
          return {
            index: i + 1,
            name: customer?.name,
            location: {
              lat: customer?.location_lat,
              lng: customer?.location_lng,
            },
          };
        }),
      }
    : null;

  return (
    <Layout manage hideBeardcrumb>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            hideButton
            title={`${trip?.name}`}
            className={stl.header}
            showBack
            navigate={() => navigate(-1)}
          />
          <span className={stl.cityName}>
            {trip.city}/{trip.areas?.map((area, i) => area.name + ", ")}
            {console.log(trip)}
          </span>
          <div className={stl.wrapper}>
            <div className={stl.topSection}>
              {canEdit && (
                <div className={stl.controls}>
                  <button
                    className={stl.controlsBtn}
                    onClick={() => setShowModalTrip(true)}
                  >
                    <MdModeEditOutline size={22} />
                    <span> تعديل</span>
                  </button>
                  <button
                    className={stl.controlsBtn}
                    onClick={() => setShowCustomersModal(true)}
                  >
                    <MdAdd size={22} />
                    <span>ادراج عملاء</span>
                  </button>
                </div>
              )}
              <div className={stl.card}>
                <strong>الايام :</strong>
                {trip?.days?.map((day) => {
                  return <span key={day}>{day + ", "}</span>;
                })}
              </div>
              <div className={stl.row}>
                <div className={stl.card}>
                  <strong>الوقت :</strong>
                  <span>{trip.delivery_date}</span>
                </div>
                <div className={stl.card}>
                  <strong>السائق :</strong>
                  <span>{trip.driver}</span>
                </div>
              </div>
            </div>
            {tableContent && <ScheduledTripTable tableContent={tableContent} />}
          </div>
          <Modal
            show={showCustomersModal}
            close={handleCloseCustomersModal}
            className={stl.modal}
          >
            <AddClientsToTripsPopup
              clients={clients}
              trip={trip}
              setSelectedClients={setSelectedClients}
              selectedClients={selectedClients}
              handleCustomersModalSubmit={handleCustomersModalSubmit}
            />
          </Modal>
          <ScheduledTripModal
            showModal={showModalTrip}
            closeModal={closeModalTrip}
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
            handleSubmit={handleModalTripSubmit}
            cities={cities}
            areasOptions={areasOptions}
            trip={trip}
          />
        </>
      )}
    </Layout>
  );
};

export default ScheduledTrip;
