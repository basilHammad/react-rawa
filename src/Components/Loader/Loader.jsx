import { Blocks } from "react-loader-spinner";

import stl from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={stl.loaderWrapper}>
      <Blocks
        visible={true}
        // height="80"
        // width="80"
        ariaLabel="blocks-loading"
        wrapperClass={stl.loaderWrapper}
      />
    </div>
  );
};

export default Loader;
