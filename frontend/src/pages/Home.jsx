import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import DoctorCard from "../components/DoctorCard";
import DoctorCarousel from "../components/DoctorCarousel";
import axios from "axios";
import { Col, Row } from "antd";

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/users/get-all-approved-doctors");
      console.log(response.data.data,"home card 444444444444444444444444");
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mainhome">
        <Header />
        <div style={{ paddingTop: "65px" }}>
          <DoctorCarousel />
        </div>
        <div className="container" style={{paddingTop:"100px",paddingBottom:"10px"}}>
        <Row gutter={[30,40]}>
        {doctors.map((doctor) => (
          <Col span={6} xs={24} sm={12} md={12} lg={8} xl={8}>
            <DoctorCard doctor1={doctor} />
          </Col>
        ))}
      </Row>
           
        </div>

        
      </div>
      {/* <div style={{ paddingTop: "40px" }}>
        <h1 className="page-title mt-5"> homepage</h1>
        <hr />
  </div> */}
    </>
  );
}

export default Home;
