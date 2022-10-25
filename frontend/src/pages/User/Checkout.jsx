import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
  MDBIcon,
  MDBRadio,
} from "mdb-react-ui-kit";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function Checkout() {
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [cod, setCod] = useState(false);
  const [online, setOnline] = useState(false);
  const navigate = useNavigate();

  const setruecod = () => {
    setCod(true);
  };

  const settrueonline = () => {
    setOnline(true);
    setCod(false);
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/get-appointment-details-by-id",
        {
          appointmentId: params.appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error ");
      dispatch(hideLoading());
    }
  };

  const initPayment = (data) => {
    console.log(data.id, "hhhhhhhhhhhhhhh");
    const options = {
      key: process.env.RAZORPAY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "doctoRay",
      description: "Test Transaction",
      image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/api/users/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
          if (data.success) {
            navigate("/");
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error, ";lllllllllllllllllllllllllllllllllllllllll");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const amount = data?.doctorInfo.feePerConsultation;

  const payment = async () => {
    if (online) {
      try {
        const { data } = await axios.post(
          "/api/users/checkout",
          {
            appointmentId: params.appointmentId,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(data, "kkkkkkkkkkkkkkkkkkkk");
        initPayment(data.data);
      } catch (error) {}
    } else if (cod) {
      try {
        console.log("cash kkkkkkkkkkkkkkkkkkkkkkkkkkk");
        navigate("/");
        toast.success(data.message);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <MDBContainer className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          {/* <div className="d-flex flex-row align-items-center">
          <h4 className="text-uppercase mt-1">Eligible</h4>
          <span className="ms-2 me-3">Pay</span>
        </div> */}
          <a href="#!">Cancel and return to the website</a>
        </div>
        <MDBRow>
          <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
            {/* <h5 className="mb-0 text-success">$85.00</h5> */}
            <h5 className="mb-3">Booking details: </h5>
            <hr />
            <div>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row mt-1">
                  {/* <h6>Insurance Responsibility</h6> */}
                  <h6 className="fw-bold text-success ms-1"></h6>
                </div>
                <div className="d-flex flex-row align-items-center text-primary">
                  {/* <span className="ms-1">Add Insurer card</span> */}
                </div>
              </div>
              {/* <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p> */}
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Patient Name: </b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    {data?.patientname}
                  </span>
                </div>
              </div>
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Patient Age: </b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    {data?.patientage}
                  </span>
                </div>
              </div>
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Phone number: </b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    {data?.phonenumber}
                  </span>
                </div>
              </div>
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Address: </b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    {data?.doctorInfo.address}
                  </span>
                </div>
              </div>
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Consultant Doctor : </b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Dr.{data?.doctorInfo.firstName} {data?.doctorInfo.lastName}
                  </span>
                </div>
              </div>
              <div
                className="p-2 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eee" }}
              >
                <b>Specialization:</b>
                <div className="ms-auto">
                  <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                    {data?.doctorInfo.specialization}
                  </span>
                </div>
              </div>
              <hr />
              {/* <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row mt-1">
                <h6>Patient Balance</h6>
                <h6 className="fw-bold text-success ms-1">$13.24</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div> */}
              {/* <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p> */}

              {/* <div class="d-flex flex-column mb-3">
                <MDBBtnGroup vertical aria-label="Vertical button group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option1"
                    autocomplete="off"
                  />
                  <label
                    className="btn btn-outline-primary btn-lg"
                    for="option1"
                  >
                    <div className="d-flex justify-content-between">
                      <span>Cash</span>
                      {/* <span>**** 5436</span> */}
              {/* </div>
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option2"
                    autocomplete="off"
                    checked
                  />
                  <label
                    className="btn btn-outline-primary btn-lg"
                    for="option2"
                  >
                    <div className="d-flex justify-content-between">
                      <span>RAZORPAY</span>
                      {/* <span>**** 5038</span> */}
              {/* </div>
                  </label>
                </MDBBtnGroup>
              </div>  */}
              <div className="d-flex flex-row pb-3 pt-3">
                <div className="d-flex align-items-center pe-2">
                  <MDBRadio
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    onClick={setruecod}
                  />
                </div>
                <div className="rounded border d-flex w-100 p-3 align-items-center">
                  <p className="mb-0">
                    <MDBIcon
                      fab
                      icon="cc-visa"
                      size="lg"
                      className="text-primary pe-2"
                    />{" "}
                    Cash payment
                  </p>
                  {/* <div className="ms-auto">************3456</div> */}
                </div>
              </div>
              <div className="d-flex flex-row pb-3">
                <div className="d-flex align-items-center pe-2">
                  <MDBRadio
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    onClick={settrueonline}
                  />
                </div>
                <div className="rounded border d-flex w-100 p-3 align-items-center">
                  <p className="mb-0">
                    <MDBIcon
                      fab
                      icon="cc-mastercard"
                      size="lg"
                      className="text-dark pe-2"
                    />{" "}
                    Online payment
                  </p>
                  <div className="ms-auto">************1038</div>
                </div>
              </div>

              {/* <MDBBtn color="success" size="md" block onClick={payment}>
                Proceed to payment
              </MDBBtn> */}
              <button onClick={payment}>Proceed to payment</button>
            </div>
          </MDBCol>
          <MDBCol md="7" lg="4" xl="4" offsetLg="1" offsetXl="2">
            <div className="p-3" style={{ backgroundColor: "#eee" }}>
              <span className="fw-bold">Order Recap</span>
              <div className="d-flex justify-content-between mt-2">
                <span>Consultation fee</span>{" "}
                <span>{data?.doctorInfo.feePerConsultation}</span>
              </div>
              {/* <div className="d-flex justify-content-between mt-2">
              <span>Amount Deductible</span> <span>$0.0</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Coinsurance(0%)</span> <span>+ $0.0</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Copayment </span> <span>+ 40.00</span>
            </div> */}
              {/* <hr />
            <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Total Deductible,
                <br />
                Coinsurance and copay
              </span>
              <span>$40.00</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Maximum out-of-pocket <br />
                on insurance policy
              </span>
              <span>$40.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Insurance Responsibility </span> <span>$71.76</span>
            </div> */}
              {/* <div className="d-flex justify-content-between mt-2">
              <span>Patient Balance </span> <span>$13.24</span>
            </div> */}
              <hr />
              <div className="d-flex justify-content-between mt-2">
                <span>Total </span>{" "}
                <span class="text-success">
                  {data?.doctorInfo.feePerConsultation}
                </span>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Checkout;
