import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { setUser } from "../../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MDBCardImage } from "mdb-react-ui-kit";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [number, setNumber] = useState();
  const navigate = useNavigate();
  const [startdate, setStartDate] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();

  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
          dateAndtime: startdate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        // toast.success("doctor info fetched successfully")
        console.log(response.data.data, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const mytime = doctor?.start;
  const mytimeto = doctor?.end;

  const starttime = moment(mytime, ["hh:mm a"]).format("HH:mm");
  const endtime = moment(mytimeto, ["hh:mm a"]).format("HH:mm");

  const mintime = starttime.split(":")[0];
  const mintime_second = starttime.split(":")[1];
  const maxtime = endtime.split(":")[0];
  const maxtime_second = starttime.split(":")[1];

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/check-booking-avilability",
        {
          doctorId: params.doctorId,
          dateAndtime: startdate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };


  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId:user._id,
          dateAndtime: startdate,
          doctorInfo:doctor,
          userInfo:user,
          patientname: name,
          patientage:age,
          phonenumber:number,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/checkout/${response.data.data._id}`)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };



  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <>
      <Header />
      <div
        style={{
          // backgroundColor: " #b3e0ff",
          backgroundImage:
            "url(" +
           "https://images.unsplash.com/photo-1618015359994-a67bd07e48b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" +
            ")",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div
          className="container"
          style={{
            paddingTop: "100px",
          }}
        >
          {doctor && (
            <div>
              <div></div>
              <h1 className="page-title">
                Dr.{doctor?.firstName.toUpperCase()}{" "}
                {doctor?.lastName.toUpperCase()}
              </h1>
              <h4>{doctor?.specialization.toUpperCase()}</h4>
              <hr />
              <Row gutter={20} className="mt-5" align="middle">
                <Col
                  span={8}
                  sm={24}
                  xs={24}
                  lg={8}
                  style={{ backgroundColor: "", borderStyle: "" }}
                >
                  <h3 className="normal-text">
                    <b>Timings :</b>
                    {doctor?.start} - {doctor?.end}
                  </h3>
                  <hr />
                  {/* <p>
                    <b>Phone Number : </b>
                    {doctor?.phoneNumber}
                  </p>
                  <p>
                    <b>Address : </b>
                    {doctor?.address}
                  </p>
                  <p>
                    <b>Fee per Visit : </b>
                    Rs. {doctor?.feePerConsultation}
                  </p> */}
                  {/* <p>
                    <b>Website : </b>
                {doctor?.website}
                  </p> */}
                  <Input
                    size="large"
                    name="name"
                    placeholder="Patientname"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <Input
                    size="large"
                    name="age"
                    placeholder="Patientage"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <Input
                    size="large"
                    name="phonenumber"
                    placeholder="Phonenumber"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                  <br />
                  <div className="d-flex flex-column pt-2 mt-2">
                    {/* <DatePicker
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        setDate(moment(value).format("DD-MM-YYYY"));
                        setIsAvailable(false);
                      }}
                    /> */}
                    {/* <TimePicker
                      format="HH:mm"
                      className="mt-3"
                      onChange={(value) => {
                        setIsAvailable(false);
                        setTime(moment(value).format("HH:mm"));
                      }}
                    /> */}
                    <DatePicker
                      selected={startdate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      minTime={new Date(0, 0, 0, mintime, mintime_second)} // 7:00am
                      maxTime={new Date(0, 0, 0, maxtime, maxtime_second)}
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText=" Date & Time"
                    />

                    {!isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={checkAvailability}
                      >
                        Check Availability
                      </Button>
                    )}

                    {isAvailable && (
                      <Button className="primary-button mt-3 full-width-button"
                      onClick={bookNow}
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
