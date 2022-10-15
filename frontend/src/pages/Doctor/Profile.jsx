import React from 'react'
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

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
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
    
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
    formdata.append("image", image);
    // formdata.append("userId", userId);

    try {
      
    } catch (error) {
      
    }


  }


  const getData=async()=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor//doctor-info",
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
        setDoctor(response.data.data)
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
        <h1 className="page-title mt-5"> ApplyDoctor</h1>
        <hr />
        <div>
          <form onSubmit={handleSubmit} allign="center">
            <Typography gutterBottom variant="h3" align="center">
              Apply Doctor
            </Typography>
            <Card>
              <CardContent>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="firstName"
                    type="text"
                    name="firstName"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="lastName"
                    type="text"
                    name="lastName"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Phone Number
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="phoneNumber"
                    type="text"
                    name="phoneNumber"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="address"
                    type="text"
                    name="address"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    specialization
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="specialization"
                    type="text"
                    name="specialization"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    {" "}
                    experience
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="experience"
                    name="experience"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    {" "}
                    feePerConsultation
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="feePerConsultation"
                    name="feePerConsultation"
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
                  />
                </FormControl>

                
                <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                  <FormLabel htmlFor="outlined-adornment-amount">
                    image
                  </FormLabel>
                  <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    label="Amount"
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormControl>
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