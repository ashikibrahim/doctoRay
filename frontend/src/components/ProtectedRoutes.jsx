// import React from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';
// import {useEffect} from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// function ProtectedRoutes(props) {

//     const user = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const getUser = async() =>{
//         try {
//             const response = await axios.post(
//                 "/api/users/get-user-info-by-id",
//                 { token: localStorage.getItem("token") },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
                
//         } catch (error) {
            
//         }
//     }


// useEffect(() => {
//   if(!user){

//     getUser()
//   }

// }, [user])


//     // if token in localstorage.
// if(localStorage.getItem("user")){
//     console.log();
//     return props.children;
    
// }else{
//     return <Navigate to="/"/>
// }
// }

// export default ProtectedRoutes