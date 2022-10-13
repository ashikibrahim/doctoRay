import React from "react";
import { Link,useNavigate} from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import toast from "react-hot-toast";
import {hideLoading, showLoading} from  "../redux/alertsSlice";
import { useEffect,useState } from "react";
import {register,reset} from '../redux/auth/authSlice'
import Header from "../components/Header";

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/users/register", values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast("redirecting to login")
        navigate("/login")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("something went wrong");
    }

    console.log("received values of form", values);
  };

  return (
    <div className="authentication">
    <div className="authentication-form card p-3">
      <h1 className="card-title">Nice To Meet U</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <Form.Item label="confirm Password" name="password2">
          <Input placeholder="confirm Password" type="password" />
        </Form.Item>
          <Button  className="primary-button my-2" htmlType="submit">
            Register
          </Button>

          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;



// const [formData,setFormData] =useState({
//   name:'',
//   email:'',
//   password:'',
//   password2:'',
// })
// const {name,email,password,password2} = formData

// const dispatch = useDispatch();
// const navigate =useNavigate();

// const {user, isLoading, isError, isSuccess, message} =useSelector(
//   (state) => state.auth)
 
//   useEffect(()=>{

//     if(isError){
//       toast.error(user.message)
//       console.log(message);
//     }
//     if(isSuccess || user){
//       toast.success(message)
//       console.log(user,"register frontend");
//       navigate('/')
//     }
    
//     dispatch(reset())
//     dispatch(hideLoading())

//   },[user,isError,isSuccess,message,navigate,dispatch])


// const onSubmit= (e) =>{
//   // e.preventDefault()
  
//   if(password !== password2){
//     toast.error('password does not match')
//   }else{
//     const userData = {
//       name,
//       email,
//       password,
      
//     }
 
//     dispatch(register(userData))
//     dispatch(showLoading())
// }
// }

  // const onChange = (e) =>{
    //   // ({we use paranthesis and curly brases here for an object})
    //   setFormData((prevState)=>({
    //     ...prevState,
    //     [e.target.name]:e.target.value,
    //   }))
    // }