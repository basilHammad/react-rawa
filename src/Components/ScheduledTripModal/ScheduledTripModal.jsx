import { useState } from "react";
import Modal from "../Modal/Modal";

import stl from "./ScheduledTripModal.module.css";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";

const ScheduledTripModal = ({
  showModal,
  closeModal,
  values,
  errors,
  handleFieldsChange,
  drivers,
  setErrors,
  handleDayChange,
  selectedDays,
  selectedCities,
  selectedAreas,
  setSelectedCities,
  setSelectedAreas,
  handleSubmit,
  cities,
  areasOptions,
  trip,
}) => {
  const [step, setStep] = useState(1);

  return (
    <Modal show={showModal} close={closeModal} className={stl.modal}>
      <div className={stl.wrapper}>
        {step === 1 && (
          <Step1
            tripName={values.tripName}
            onChange={handleFieldsChange}
            errors={errors}
            onSubmit={() => {}}
            drivers={drivers}
            driverId={values.driverId}
            setStep={setStep}
            setErrors={setErrors}
          />
        )}
        {step === 2 && (
          <Step2
            onChangeDayChange={handleDayChange}
            selectedDays={selectedDays}
            onTimeChange={handleFieldsChange}
            time={values.time}
            setStep={setStep}
            setErrors={setErrors}
            errors={errors}
          />
        )}
        {step === 3 && (
          <Step3
            setSelectedCities={setSelectedCities}
            setSelectedAreas={setSelectedAreas}
            onSubmit={handleSubmit}
            selectedCities={selectedCities}
            selectedAreas={selectedAreas}
            setErrors={setErrors}
            errors={errors}
            cities={cities}
            areasOptions={areasOptions}
            trip={trip}
          />
        )}
      </div>
    </Modal>
  );
};

export default ScheduledTripModal;
