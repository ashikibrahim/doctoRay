import React from 'react'
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import { Await, useNavigate,useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";

function Profile() {

  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const  user  = useSelector((state) => state.user);
 
  const [doctor, setDoctor] = useState(null);
  const [start,setStart]=useState(null)
  const [end,setEnd] = useState(null)
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formdata = new FormData();

    formdata.append("firstName", e.target.firstName.value);
    formdata.append("lastName", e.target.lastName.value);
    formdata.append("phoneNumber", e.target.phoneNumber.value);
    formdata.append("address", e.target.address.value);
    formdata.append("specialization", e.target.specialization.value);
    formdata.append("experience", e.target.experience.value);
    formdata.append("feePerConsultation", e.target.feePerConsultation.value);
    formdata.append("start", e.target.start.value);
    formdata.append("end", e.target.end.value);
    // formdata.append("image", image);
    // formdata.append("userId", user?._id);
    // console.log(user?._id,"pppppppppppppppppppppppppppppppp");
   console.log( formdata,"formdata9999999999999999999999999999999999999999999");
    try 
    {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/update-doctor-info",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
 
      
      dispatch(hideLoading());
      if (response.data.success) {
        // toast.success(response.data.message);
        // navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong frontend");
    }
  };


  const getData=async()=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/doctor-info",
        {
          userId:params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if(response.data.success){
        toast.success(response.data.message);
        setDoctor(response.data.data);
         const result = response.data.data;
        const convert_starttime = result.start.split(" ")[0];
        const convert_endtime = result.end.split(" ")[0];
        setStart(convert_starttime);
        setEnd(convert_endtime);
        
      }else{
        toast.error("Error")
      }
    } catch (error) {
      
    }
  };


useEffect(()=>{
  getData()
},[])

  return (
    <>
    <Header/>
    <div style={{ paddingTop: "40px" }}>
        <h1 className="page-title mt-5"> </h1>
        <hr />
        <div>
          <form onSubmit={handleSubmit} allign="center">
            <Typography gutterBottom variant="h3" align="center">
            Edit Profile
            </Typography>
            <Card>
              <CardContent>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                First Name
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="firstName"
                    type="text"
                    name="firstName"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.firstName}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                Last Name
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="lastName"
                    type="text"
                    name="lastName"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.lastName}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>

                  <FormLabel htmlFor="outlined-adornment-amount">
                  Phone Number
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.phoneNumber}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                address
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="address"
                    type="text"
                    name="address"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.address}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                specialization
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="specialization"
                    type="text"
                    name="specialization"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.specialization}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                      {" "}
                    feePerConsultation
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="experience"
                    name="experience"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.experience}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                      {" "}
                    feePerConsultation
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="feePerConsultation"
                    name="feePerConsultation"
                    onChange={(e)=>setDoctor(e.value)}
                    value={doctor?.feePerConsultation}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <FormLabel htmlFor="outlined-adornment-amount">
                    consult start
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="feePerConsultation"
                    type="time"
                    name="start"
                    onChange={(e)=>setDoctor(e.value)}
                    value={start}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <FormLabel htmlFor="outlined-adornment-amount">
                    consult end
                  </FormLabel>  
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="feePerConsultation"
                    type="time"
                    name="end"
                    onChange={(e)=>setDoctor(e.value)}
                    value={end}
                  />
                </FormControl>

                
                {/* <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <FormLabel htmlFor="outlined-adornment-amount">
                    image
                  </FormLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="Amount"
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormControl> */}
              </CardContent>
              <Box align="center">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Card>
          </form>
        </div>
      </div>

    </>
  )
}

export default Profile