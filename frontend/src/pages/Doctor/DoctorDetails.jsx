import React from "react";
import Header from "../../components/Header";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function DoctorDetails() {
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response, "hhhhhhhhhhhhhhhhhhhhhhhhhh");
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
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
        className="gradient-custom-2"
        style={{
          backgroundColor: "#ccffee",
          paddingTop: "50px",
          backgroundImage:
            "url(" +
            "https://images.unsplash.com/photo-1565647946321-a146ac24a220?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" +
            ")",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#3973ac", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={doctor?.image}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    {/* <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn> */}
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography style={{}} tag="h5">
                      Dr.{doctor?.firstName.toUpperCase()}
                    </MDBTypography>
                    <MDBCardText>
                      {doctor?.specialization.toUpperCase()}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="p-1 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  {/* <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div> */}
                </div>
                <MDBCardBody className="text-black p-5">
                  <div className="mb-2">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-1" style={{ backgroundColor: "bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">
                      <MDBIcon fas icon="map-marker-alt" />
                      Address
                    </p>
                    <div
                      className="p-2"
                      style={{ backgroundColor: "  #bfbfbf" }}
                    >
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.address}
                      </MDBCardText>
                      {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText> */}
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">Phone Number: </p>
                    <div className="p-2" style={{ backgroundColor: " #bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.phoneNumber}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">Experience: </p>
                    <div className="p-2" style={{ backgroundColor: " #bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.experience}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">Doctor-fee: </p>
                    <div className="p-2" style={{ backgroundColor: " #bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.feePerConsultation}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">start-time: </p>
                    <div className="p-2" style={{ backgroundColor: " #bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.start}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="lead fw-normal mb-1">End-time:</p>
                    <div className="p-2" style={{ backgroundColor: " #bfbfbf" }}>
                      <MDBCardText className="font-italic mb-1">
                        {doctor?.end}
                      </MDBCardText>
                    </div>
                  </div>
                  <MDBBtn className="float-end" color="success" rounded block size="md"  onClick={() => navigate(`/book-appointment/${doctor._id}`)} >
                                        <MDBIcon far icon="clock me-2" /> Make An Appointment
                                    </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

export default DoctorDetails;
