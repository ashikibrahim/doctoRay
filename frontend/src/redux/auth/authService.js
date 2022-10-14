// import axios from "axios";

// const API_URL = "/api/users/";

// //Register user
// const register = async (userData) => {
//   console.log("sssssssss");
//   const response = await axios.post(API_URL + "register", userData);

//   if (response.data) {
  
//     console.log(response.data,"if res.data authservice reg");
//     // we need string in localstorage that is  why json.stringify set token here and access in auth middleware
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", JSON.stringify(response.data));

//   }
//   console.log(response.data,"register response authservice");
//   return response.data;
// };

// //Login user
// const login = async (userData) => {
//   const response = await axios.post(API_URL + "login", userData);

//   if (response.data) {
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", JSON.stringify(response.data));
//     console.log(response.data,"user111at auth service");
//   } 
//   console.log(response.data, "auth service");
//   return response.data;
// };

// //markSeenNotifications
// const markSeenNotifications = async (token) => {
//   console.log("inside service");
//   console.log(token);
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.post(
//       API_URL + "mark-all-notifications-as-seen",
//       config,
//     );
//     console.log(response.data, "response authservice notification");
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };


// //markSeenNotifications
// const deleteAllNotifications = async (token) => {
//     console.log("inside service2 delete");
//     console.log(token);
//     try {
//       const config = {
//         headers: {
//             Authorization : `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const response = await axios.post(
//         API_URL + "delete-all-notifications",
//         config
//       );
//       console.log(response.data, "response authservice notification delete all");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//Logout user
// const logout = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// };

// const authService = {
//   register,
//   login,
//   logout,

// };

// export default authService;
