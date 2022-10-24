import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } ../pages/Redux/userSlice"
import axios from "axios";
import toast from "react-hot-toast";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import DrawerComp from "../pages/User/Drawer";

function Navbar() {


  const userMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor"
    },
    {
      name: "Make an Appointment",
      path: "",
    },
    {
      name: "Contact",
      path: "",
    }
  ]

  const doctorMenu = [
    {
      name: "Home",
      path: "/",

    },
    {
      name: "Appointments",
      path: "",

    },
    {
      name: "Profile",
      path: ""

    }
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",

    },
    {
      name: "Users",
      path: "/admin/userslist",

    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",

    },
    {
      name: "Profile",
      path: "",

    },
  ];

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [auth, setAuth] = React.useState(true);

  const getData = async () => {
    // toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/api/user/getuserinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.dismiss();
      if (response.data.success) {
        const userData = response.data.data;
        
        if(userData.isBlock === "block"){
          localStorage.clear();
           toast.error("Your are blocked");

        }else{
          // setUserInfo(response.data.data);
        dispatch(setUser(response.data.data));
        }
        
      } else {
        // localStorage.removeItem("user");
        // navigate("/login");
        // toast.error("Something went wrong");
      }
    } catch (error) {
      // localStorage.removeItem("user");
      // navigate("/login");
      // toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      getData();
    }
  }, [userInfo]);


  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Doctor
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ paddingLeft: "10%" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {/* <Tab label="Home" />
                <Tab label="Apply Doctor"  onClick={() => navigate("/login")} />
                <Tab label="Make an Appointment" />
                <Tab label="Contact" /> */}

                {menuToBeRendered.map((menu) => (
                  <Tab label={menu.name} onClick={() => navigate(menu.path)} />
                ))}

                {/* <Button  style={{
        borderRadius: 35,
        backgroundColor: "#ffff",
        color:"#063970",
        padding: "15px 30px",
        fontSize: "15px",
        height: "45px"
    }}variant="contained" size="small"> Make an Appointment</Button> */}
              </Tabs>
              {auth && (
                <div style={{ marginLeft: "auto" }}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  onClick={()=>navigate("/notifications")}
                  >
                    <Badge badgeContent={user?.unseenNotifications.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {user == null ? (
                      <MenuItem sx={{ color: "#063970" }} onClick={handleClose}>
                        Profile
                      </MenuItem>
                    ) : (
                      <MenuItem sx={{ color: "#063970" }} onClick={handleClose}>
                        {user.name}
                      </MenuItem>
                    )}

                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    {user == null ? (
                      <MenuItem onClick={() => navigate("/login")}>
                        Login
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          localStorage.clear();
                          navigate("/login");
                        }}
                      >
                        Logout
                      </MenuItem>
                    )}
                  </Menu>
                </div>
              )}
              {/* <Button onClick={()=>navigate('/login')} sx={{ marginLeft: "auto" }} variant="contained">
              Login
            </Button>
            <Button sx={{ marginLeft: "10px" }} variant="contained">
              SignUp
            </Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;

// {/* <div style={{paddingTop:"40px"}}>
//       <h1 className="page-title mt-5"> ApplyDoctor</h1>
//       <hr />
//       <Form sx={{marginTop:"20px"}} layout="vertical" onFinish={onFinish}>
//         <h1 className="card-title mt-3">Personal Information</h1>
//         {/* by default antd row will be having 24 columns */}
//         <Row gutter={20}>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="First Name"
//               name="firstName"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="First Name" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Last Name"
//               name="lastName"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Last Name" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Phone Number"
//               name="phoneNumber"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Phone Number" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Address"
//               name="address"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Address" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Website"
//               name="website"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Website" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <hr />
//         <h1 className="card-title mt-3">Professional Information</h1>
//         <Row gutter={20}>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Specialization"
//               name="specialization"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Specialization" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Experience"
//               name="experience"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Experience" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Consultation fee"
//               name="feePerConsultation"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="Consultation fee" />
//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="idProof"
//               name="idProof"
//               type="file"
//               onChange={(e)=>setImage(e.target.files[0])}
//               rules={[{ required: true }]}
//             >
//               <Upload>
//               <Input placeholder="doctor id Proof" />
//               </Upload>

//             </Form.Item>
//           </Col>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Timings"
//               name="timings"
//               rules={[{ required: true }]}
//             >
//               <TimePicker.RangePicker format="HH:mm" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <div className="d-flex justify-content-end">
//           <Button className="primary-button-form" htmlType="submit">
//             SUBMIT
//           </Button>
//         </div>
//       </Form>
//       </div> */}

//function
// const onFinish = async (values) => {
 
//   console.log(values,"onfinish applyform");


//  try{
//  dispatch(showLoading());
//  const response = await axios.post(
//    "/api/users/apply-doctor-account",
//    {
//      ...values,
//      userId: user._id,
//      idProof:image,
//    },
//    {
//      headers: {
//        Authorization: `Bearer ${localStorage.getItem("token")}`,

//      },
//    }
//  );
//  dispatch(hideLoading());
//  if (response.data.success) {
//    toast.success(response.data.message);
//    navigate("/");
//  } else {
//    toast.error(response.data.message);
//  }
// }catch(error){
//  dispatch(hideLoading());
//  toast.error("something went wrong")
// }
// };

{/* <>
<div className="mainhome">
  <Header />

  <MDBContainer
    fluid
    className="container"
    style={{
      backgroundColor: "",
      paddingTop: "100px",
      paddingBottom: "50px",
    }}
  >
    <MDBCard>
      <MDBCardBody>
        <MDBRow className="d-flex justify-content-center pb-5">
          <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
            <div className="py-4 d-flex flex-row">
              <h5>
                <span className="far fa-check-square pe-2"></span>
                <b>ELIGIBLE</b> |
              </h5>
              <span className="ps-2">Pay</span>
            </div>
            <h4>Booking Details :</h4>
            <hr />
            <MDBCardText>
              <div style={{ paddingTop: "5px" }}>
                {/* <h3 className="normal-text" >
                      <b>Timings :</b>

                  </h3>
                  <hr /> */}
                // <div className="d-flex flex-column">
                //   <p>
                    {/* <b>Patient Name: </b>
                                      <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                          {data?.patientname}
                                      </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Patient Name: </b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           {data?.patientname}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                   <p>
//                     {/* <b>Patient Age:</b>
//                                       <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
//                                           {data?.patientage}
//                                       </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Patient Age:</b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           {data?.patientage}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                   <p>
//                     {/* <b>Phone Number : </b>
//                                       <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
//                                           {data?.phonenumber}
//                                       </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Phone Number : </b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           {data?.phonenumber}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                   <p>
//                     {/* <b>Address : </b>
//                                       <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
//                                           {data?.doctorInfo.address}
//                                       </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Address : </b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           {data?.doctorInfo.address}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                   <p>
//                     {/* <b>Consultant Doctor : </b>
//                                       <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
//                                           Dr.{data?.doctorInfo.firstName} {data?.doctorInfo.lastName}
//                                       </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Consultant Doctor : </b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           Dr.{data?.doctorInfo.firstName}{" "}
//                           {data?.doctorInfo.lastName}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                   <p>
//                     {/* <b>Specialization: </b>
//                                       <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
//                                           {data?.doctorInfo.specialization}
//                                       </span> */}

//                     <div className="p-2 d-flex">
//                       <b>Specialization: </b>
//                       <div className="ms-auto">
//                         <span
//                           style={{
//                             fontSize: "18px",
//                             fontWeight: "bolder",
//                           }}
//                         >
//                           {data?.doctorInfo.specialization}
//                         </span>
//                       </div>
//                     </div>
//                   </p>
//                 </div>
//               </div>
//             </MDBCardText>
//             {/* <h4 className="text-success">$85.00</h4>
//               <h4>Diabetes Pump &amp; Supplies</h4>
//               <div className="d-flex pt-2">
//                   <div>
//                       <p>
//                           <b>
//                               Insurance Responsibility{" "}
//                               <span className="text-success">$71.76</span>
//                           </b>
//                       </p>
//                   </div>
//                   <div className="ms-auto">
//                       <p className="text-primary">
//                           <MDBIcon
//                               fas
//                               icon="plus-circle"
//                               className="text-primary pe-1"
//                           />
//                           Add insurance card
//                       </p>
//                   </div>
//               </div>
//               <p>
//                   Insurance claims and all necessary dependencies will be
//                   submitted to your insurer for the coverred portion of this order
//               </p>
//               <div
//                   className="rounded d-flex"
//                   style={{ backgroundColor: "#f8f9fa" }}
//               >
//                   <div className="p-2">Aetna-Open Access</div>
//                   <div className="ms-auto p-2">OAP</div>
//               </div>
//               <hr /> */}
//             <div className="pt-2">
//               {/* <div className="d-flex pb-2">
//                       <div>
//                           <p>
//                               <b>
//                                   Patient Balance{" "}
//                                   <span className="text-success">$13.24</span>
//                               </b>
//                           </p>
//                       </div>
//                       <div className="ms-auto">
//                           <p className="text-primary">
//                               <MDBIcon
//                                   fas
//                                   icon="plus-circle"
//                                   className="text-primary pe-1"
//                               />
//                               Add payment card
//                           </p>
//                       </div>
//                   </div> */}
//               {/* <p>
//                       This is an estimate for the portion of your order (not covered
//                       by insurance) due today . once insurance finalizes their
//                       review refunds and/or balances will reconcile automatically.
//                   </p> */}
//             </div>
//           </MDBCol>
//           <MDBCol className="pt-5" md="5" xl="4" offsetXl="1">
//             {" "}
//             <div className="py-4 d-flex justify-content-end">
//               <h6>
//                 <a href="/">Cancel and return to website</a>
//               </h6>
//             </div>
//             <div
//               className="rounded d-flex flex-column p-2"
//               style={{ backgroundColor: "#f8f9fa" }}
//             >
//               <div className="p-2 me-3">
//                 <h4>Order Recap</h4>
//               </div>
//               <div className="p-2 d-flex">
//                 <MDBCol size="8">Consultant free</MDBCol>
//                 <div className="ms-auto">
//                   {data?.doctorInfo.feePerCunsultation}
//                 </div>
//               </div>
//               {/* <div className="p-2 d-flex">
//                               <MDBCol size="8">Amount toward deductible</MDBCol>
//                               <div className="ms-auto">$0.00</div>
//                           </div>
//                           <div className="p-2 d-flex">
//                               <MDBCol size="8">Coinsurance(0%)</MDBCol>
//                               <div className="ms-auto">+ $0.00</div>
//                           </div>
//                           <div className="p-2 d-flex">
//                               <MDBCol size="8">Copayment</MDBCol>
//                               <div className="ms-auto">+ $40.00</div>
//                           </div>
//                           <div className="border-top px-2 mx-2"></div>
//                           <div className="p-2 d-flex pt-3">
//                               <MDBCol size="8">
//                                   Total Deductible, Coinsurance, and Copay
//                               </MDBCol>
//                               <div className="ms-auto">$40.00</div>
//                           </div>
//                           <div className="p-2 d-flex">
//                               <MDBCol size="8">
//                                   Maximum out-of-pocket on Insurance Policy (not reached)
//                               </MDBCol>
//                               <div className="ms-auto">$6500.00</div>
//                           </div>
//                           <div className="border-top px-2 mx-2"></div>
//                           <div className="p-2 d-flex pt-3">
//                               <MDBCol size="8">Insurance Responsibility</MDBCol>
//                               <div className="ms-auto">
//                                   <b>$71.76</b>
//                               </div>
//                           </div>
//                           <div className="p-2 d-flex">
//                               <MDBCol size="8">
//                                   Patient Balance{" "}
//                                   <span className="fa fa-question-circle text-dark"></span>
//                               </MDBCol>
//                               <div className="ms-auto">
//                                   <b>$71.76</b>
//                               </div>
//                           </div> */}
//               <div className="border-top px-2 mx-2"></div>
//               <div className="p-2 d-flex pt-3">
//                 <MDBCol size="8">
//                   <b>Total</b>
//                 </MDBCol>
//                 <div className="ms-auto">
//                   <b className="text-success">
//                     ${data?.doctorInfo.feePerCunsultation}
//                   </b>
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex flex-row pb-3 pt-3">
//               <div className="d-flex align-items-center pe-2">
//                 <MDBRadio
//                   name="radioNoLabel"
//                   id="radioNoLabel1"
//                   onClick={setruecod}
//                 />
//               </div>
//               <div className="rounded border d-flex w-100 p-3 align-items-center">
//                 <p className="mb-0">
//                   <MDBIcon
//                     fab
//                     icon="cc-visa"
//                     size="lg"
//                     className="text-primary pe-2"
//                   />{" "}
//                   COD
//                 </p>
//                 {/* <div className="ms-auto">************3456</div> */}
//               </div>
//             </div>
//             <div className="d-flex flex-row pb-3">
//               <div className="d-flex align-items-center pe-2">
//                 <MDBRadio
//                   name="radioNoLabel"
//                   id="radioNoLabel1"
//                   onClick={settrueonline}
//                 />
//               </div>
//               <div className="rounded border d-flex w-100 p-3 align-items-center">
//                 <p className="mb-0">
//                   <MDBIcon
//                     fab
//                     icon="cc-mastercard"
//                     size="lg"
//                     className="text-dark pe-2"
//                   />{" "}
//                   Online payment
//                 </p>
//                 <div className="ms-auto">************1038</div>
//               </div>
//             </div>
          
//             {/* <MDBBtn color="success" size="md" block onClick={payment}>
//               Proceed to payment 
//             </MDBBtn> */}
//             <button  onClick={payment}>
//             Proceed to payment
//             </button>
//           </MDBCol>
//         </MDBRow>
//       </MDBCardBody>
//     </MDBCard>
//   </MDBContainer>
// </div>
// </> */}