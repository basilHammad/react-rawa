import { useState } from "react";
import { MdDangerous } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import ValidateModal from "../../../../Components/ValidateModal/ValidateModal";
import Modal from "../../../../Components/Modal/Modal";

import stl from "./Table.module.css";
import { useEffect } from "react";

const Table = ({
  titles,
  data,
  deleteItem,
  path,
  purchase,
  editPurchase,
  modalEdit,
  handleModalEdit,
  showTotals,
  discountTotal,
  totalTotal,
  vatTotal,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteItemId(id);
  };

  const handleValidate = () => {
    setIsValidated(true);
  };

  useEffect(() => {
    if (!isValidated) return;
    setShowModal(false);
    deleteItem(deleteItemId);
    setIsValidated(false);
  }, [isValidated]);

  const getTotalsCells = (title, i) => {
    if (title === "الخصم") return discountTotal?.toFixed(2);
    if (title === "المجموع") return totalTotal?.toFixed(2);
    if (title === "الضريبة") return vatTotal?.toFixed(2);

    return "-";
  };

  return (
    <>
      <div className={stl.bgWrapper}>
        <div className={stl.table}>
          <div className={`${stl.row} ${stl.header}`}>
            <div className={`${stl.cell} m-show`}></div>
            {titles.map((title, i) => (
              <div key={i} className={stl.cell}>
                {title}
              </div>
            ))}
            <div className={`${stl.cell} ${stl.control} m-hide`}>
              <div className={stl.controlsWrapper}>
                <MdSettings size={22} className={stl.settingsIcon} />
              </div>
            </div>
          </div>
          {data.map((row, i) => {
            return (
              <div key={i} className={stl.row}>
                <div className={`${stl.cell} m-show`}>
                  <MdDangerous
                    onClick={() => handleDelete(row.id)}
                    size={22}
                    color="#dc3545"
                  />
                </div>
                {Object.entries(row).map((cell, i) => {
                  const key = cell[0];
                  const value = cell[1];

                  if (key === "id") return;
                  if (
                    key === "transaction_date" ||
                    key === "invoice_date" ||
                    key === "created_at"
                  ) {
                    const timestamp = new Date(value);

                    return (
                      <div className={stl.cell} key={i}>
                        {`${+timestamp.getDate()}/${
                          +timestamp.getMonth() + 1
                        }/${+timestamp.getFullYear()}`}
                      </div>
                    );
                  }

                  return (
                    <div key={i} className={stl.cell}>
                      {value ? value : "-"}
                    </div>
                  );
                })}

                <div className={`${stl.cell} ${stl.control} m-hide`}>
                  <div className={stl.controlsWrapper}>
                    {!purchase ? (
                      <>
                        {!modalEdit ? (
                          <Link to={path + row.id} className={stl.iconWrapper}>
                            <MdModeEditOutline size={22} color="#0d83f8" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleModalEdit(row.id)}
                            className={stl.iconWrapper}
                          >
                            <MdModeEditOutline size={22} color="#0d83f8" />
                          </button>
                        )}
                        <MdDangerous
                          onClick={() => handleDelete(row.id)}
                          size={22}
                          color="#dc3545"
                        />
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => editPurchase(row.id)}
                          className={stl.iconWrapper}
                        >
                          <MdModeEditOutline size={22} color="#0d83f8" />
                        </button>
                        <MdDangerous
                          onClick={() => handleDelete(row.id)}
                          size={22}
                          color="#dc3545"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {showTotals && (
            <div className={`${stl.row} ${stl.totals}`}>
              <div className={`${stl.cell} m-show`}>
                <strong>المجموع:</strong>
              </div>
              {titles.map((title, i) => {
                if (i === 0 && window.innerWidth >= 1024) {
                  return (
                    <div key={i} className={`${stl.cell} m-hide`}>
                      <strong>المجموع:</strong>
                    </div>
                  );
                }

                return (
                  <div key={i} className={stl.cell}>
                    {getTotalsCells(title, i)}
                  </div>
                );
              })}
              <div className={`${stl.cell} ${stl.control} m-hide`}>-</div>
            </div>
          )}
          <div className={`${stl.control} m-show`}>
            <div className={stl.iconWrapper}>
              <MdSettings size={22} color="#fff" className={stl.settingsIcon} />
            </div>
            {data.map((item, i) => {
              return !purchase && !modalEdit ? (
                <Link to={path + item.id} className={stl.iconWrapper} key={i}>
                  <MdModeEditOutline size={22} color="#0d83f8" />
                </Link>
              ) : !modalEdit ? (
                <button
                  onClick={() => editPurchase(item.id)}
                  className={stl.iconWrapper}
                  key={i}
                >
                  <MdModeEditOutline size={22} color="#0d83f8" />
                </button>
              ) : (
                <button
                  onClick={() => handleModalEdit(item.id)}
                  className={stl.iconWrapper}
                  key={i}
                >
                  <MdModeEditOutline size={22} color="#0d83f8" />
                </button>
              );
            })}
            {showTotals && <div className={stl.iconWrapper}></div>}
          </div>
        </div>
      </div>
      <Modal show={showModal} close={() => setShowModal(false)} validate>
        <ValidateModal
          handleValidate={handleValidate}
          closeModal={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};

export default Table;
