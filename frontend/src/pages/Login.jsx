import React from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useState,useEffect } from "react"; 
import { useSelector,useDispatch} from "react-redux";
import {hideLoading, showLoading} from  "../redux/alertsSlice"
import {setUser} from '../redux/userSlice'
import Header from "../components/Header";


function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values,"values login page");
      const response = await axios.post("/api/users/login", values);

      dispatch(hideLoading());
      console.log(response,"response login9999999999999999999");
      console.log(response.data.data,"data.data login88888888888888888");
      if (response.data.Success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        // dispatch(setUser(response.data.data))
        navigate("/");
      } else {
        toast.error("login error");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  

  return (
   <div className="outerdiv">
    <div className="authentication">
    <div className="authentication-form card p-3">
        <h1 className="card-title">doctoRay</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
         
        </Form>
      </div>
      </div>
    </div>
    
  );
};

export default Login;


// login return
{/* <div className="outerdiv"> */}
{/* <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">doctoRay</h1>
        <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Email" name="email">
            <Input  placeholder="email" name="email" id="email" value={email} onChange={onChange}/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" name="password" id="password" value={password} onChange={onChange} />
          </Form.Item>
          <Button className="primary-button my-2" htmlType="submit">
            Login
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div> 
      </div> 
  */}

    // login functions
    // const [formData,setFormData] = useState({
    //   email:'',
    //   password:'',
    // })
    
    // const {email,password} = formData 
    
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    
    // const {user, isLoading, isError, isSuccess, message} =useSelector(
    // (state) => state.auth
    // )
    
    // console.log(user);
    // useEffect(()=>{
    
    //   if(isError){
    //     toast.error(message)
    //   }
    //   if(isSuccess || user){
    //     navigate('/')
    //   }
    //   dispatch(reset())
    
    // },[user, isError, isSuccess, message, navigate, 
    // dispatch])
    
    
    // const onChange = (e) => {
      
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value, 
    //   }))
    // }
    
    //  const onSubmit = (e) =>{
    //   //  e.preventDefault()
    
    //    const userData ={
    //      email,
    //      password,
    //    }
     
    //    dispatch (login(userData))
    
    //    if(!email || !password){
    //     toast.error("invalid credentials")
    //    }
    
    
    
    //  }