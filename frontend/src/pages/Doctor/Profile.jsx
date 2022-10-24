import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import moment from "moment";
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
  getBottomNavigationActionUtilityClass,
} from "@mui/material";

function Profile() {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [firstname, setName] = useState();
  const [lastname, setLastname] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [specialization, setSpecialization] = useState();
  const [experience, setExperience] = useState();
  const [fee, setFee] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(e.target.firstName.value);
    setLastname(e.target.lastName.value);
    setPhoneNumber(e.target.phoneNumber.value);
    setAddress(e.target.address.value);
    setSpecialization(e.target.specialization.value);
    setExperience(e.target.experience.value);
    setFee(e.target.feePerConsultation.value);
    setStart(e.target.start.value);
    setEnd(e.target.end.value);

    const obj = {
      firstname,
      lastname,
      phonenumber,
      address,
      specialization,
      experience,
      fee,
      start,
      end,
    };

    console.log("gggggggggggggggggggg", specialization);

    console.log(
      e.target.specialization.value,
      "ttttttttttttttttttttttttttttttttt"
    );

    try {
      dispatch(showLoading());
      const response = await axios.post("/api/doctor/update-doctor-info", obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response, "hhhhhhhhhhhhhhhhhhhhhhhh");
        // navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong frontend");
    }
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/doctor-info",
        {
          userId: params.userId,
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
        setDoctor(response.data.data);
        const result = response.data.data;
        const convert_starttime = result.start.split(" ")[0];
        const convert_endtime = result.end.split(" ")[0];
        setStart(convert_starttime);
        setEnd(convert_endtime);
      } else {
        toast.error("Errror");
      }
    } catch (error) {}
  };

  console.log(start, "mmmmmmmmmmmmmmmmmmmmmmm");

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="container formdody" style={{ paddingTop: "100px" }}>
        <form onSubmit={handleSubmit}>
          <Typography gutterBottom variant="h3" align="center">
            Edit Profile
          </Typography>

          <Card style={{ backgroundColor: "#E8EDF2", paddingBottom: "20px" }}>
            <CardContent>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  First Name
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="First Name"
                  type="text"
                  name="firstName"
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.firstName}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  Last Name
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.lastName}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  phone Number
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="phone Number"
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => setDoctor(e.value)}
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
                  name="address"
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.address}
                />
              </FormControl>
              {/* <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  Website
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Website"
                  name="website"
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.website}
                />
              </FormControl> */}
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  specialization
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="specialization"
                  type="text"
                  name="specialization"
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.specialization}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  {" "}
                  experience
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="experience"
                  name="experience"
                  onChange={(e) => setDoctor(e.value)}
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
                  onChange={(e) => setDoctor(e.value)}
                  value={doctor?.feePerConsultation}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  consulting-start
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="feePerConsultation"
                  type="time"
                  name="start"
                  onChange={(e) => setStart(e.value)}
                  value={start}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, width: "70ch", ml: 45 }}>
                <FormLabel htmlFor="outlined-adornment-amount">
                  consulting-end
                </FormLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="feePerConsultation"
                  type="time"
                  name="end"
                  onChange={(e) => setEnd(e.value)}
                  value={end}
                />
              </FormControl>

              {/* <Typography sx={{ mr: 50 }} align="center">
                  Image
                </Typography> */}
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
    </>
  );
}

export default Profile;
