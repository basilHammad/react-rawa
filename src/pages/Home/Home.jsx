import { Link } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";

import stl from "./Home.module.css";

const Home = () => {
  return (
    <Layout>
      <div className={stl.wrapper}>
        <Link className={stl.mainLink} to="/pos/direct">
          المبيعات
        </Link>
        <Link className={stl.mainLink} to="/">
          ادارة المحل
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
