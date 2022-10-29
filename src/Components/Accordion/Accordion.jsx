import { MdExpandMore } from "react-icons/md";

import stl from "./Accordion.module.css";

const Accordion = ({ children, showChildren, toggleChildren }) => {
  return (
    <div className={stl.accordion}>
      <div
        className={`${stl.accordionHead} ${showChildren ? stl.show : ""}`}
        onClick={() => toggleChildren((pre) => !pre)}
      >
        <div className={stl.headWrapper}>
          <img src="/assets/images/clipboard.svg" />
          <span>التقارير</span>
        </div>
      </div>
      {showChildren && <div className={stl.accordionBody}>{children}</div>}
    </div>
  );
};

export default Accordion;
