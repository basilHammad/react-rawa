import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import InputGroup from "../InputGroup/InputGroup";
import MainBtn from "../MainBtn/MainBtn";
import stl from "./AddClientsToTripsPopup.module.css";

const AddClientsToTripsPopup = ({
  clients,
  selectedClients,
  setSelectedClients,
  handleCustomersModalSubmit,
}) => {
  const [filteredClients, setFilteredClients] = useState(clients);
  const [clientName, setClientName] = useState("");
  const clientsIds = clients.map((client) => +client.id);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "all") {
      if (JSON.stringify(selectedClients) === JSON.stringify(clientsIds)) {
        setSelectedClients([]);
      } else {
        setSelectedClients(clientsIds);
      }
      return;
    }
    if (selectedClients?.includes(+value)) {
      setSelectedClients((pre) => pre.filter((val) => val !== +value));
      return;
    }

    setSelectedClients((pre) => {
      return [...pre, +value];
    });
  };

  useEffect(() => {
    const filterOptions = clients.filter((client) =>
      client?.name.includes(clientName)
    );
    setFilteredClients(filterOptions);
  }, [clientName]);

  return (
    <div className={stl.modalWrapper}>
      <InputGroup
        type="text"
        id="name"
        label="الاسم"
        placeholder="ادخل الاسم"
        name="name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <div className={stl.table}>
        <div className={`${stl.row} ${stl.header}`}>
          <span className={stl.cell}>
            <input
              name="all"
              type="checkbox"
              onChange={handleChange}
              checked={
                JSON.stringify(selectedClients) === JSON.stringify(clientsIds)
              }
            />
          </span>
          <span className={stl.cell}>الاسم</span>
          <span className={stl.cell}>المدينة</span>
          <span className={stl.cell}>المنطقة</span>
        </div>
        {filteredClients.map((client, i) => (
          <label className={stl.row} key={i}>
            <span className={stl.cell}>
              <input
                type="checkbox"
                value={client.id}
                onChange={handleChange}
                checked={selectedClients?.includes(client.id)}
              />
            </span>
            <span className={stl.cell}>{client.name}</span>
            <span className={stl.cell}>{client.city ? client.city : "-"}</span>
            <span className={stl.cell}>{client.area ? client.area : "-"}</span>
          </label>
        ))}
      </div>

      <MainBtn className={stl.btn} onClick={handleCustomersModalSubmit}>
        استمرار
      </MainBtn>
    </div>
  );
};

export default AddClientsToTripsPopup;
