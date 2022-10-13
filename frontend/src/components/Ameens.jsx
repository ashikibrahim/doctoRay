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
