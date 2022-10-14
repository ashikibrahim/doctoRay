// import React from "react";
// import "../Layout.css";
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import { logout,reset } from '../redux/auth/authSlice';
// import { hideLoading, showLoading } from "../redux/alertsSlice";
// import {Badge} from 'antd'
// function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onLogout = () => {
//     dispatch(logout())
//     dispatch(reset())
//     dispatch(showLoading())
//     navigate('/')
//     dispatch(hideLoading())
//   }


//   const {user} = useSelector((state)=> state.auth)
// //  console.log(user.unseenNotifications,"sahjgsadfjhsfd");
// //  const result=user?.unseenNotifications?.length || 0 ;
// //  console.log(result,"000000");
//   const userMenu = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     {
//       name: "Appointments",
//       path: "/appointments",
//     },
//     {
//       name: "Apply-doctor",
//       path: "/apply-doctor",
//     },
//     {
//       name: "Profile",
//       path: "/Profile",
//     },
  
//   ];

//   const doctorMenu = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     {
//       name: "Appointments",
//       path: "/doctor/appointments",
//     },
//     {
//       name: "Profile",
//       path: `/doctor/profile/${user?._id}`,
//     },
//   ];

//   const adminMenu = [
//     {
//       name: "Home",
//       path: "/",
      
//     },
//     {
//       name: "Users",
//       path: "/admin/userslist",
     
//     },
//     {
//       name: "Doctors",
//       path: "/admin/doctorslist",
      
//     },
//     {
//       name: "Profile",
//       path: "/profile",
     
//     },
//   ];


//   const menuToBeRendered = user ?.isAdmin ? adminMenu : userMenu ;

//   return (
//     <>
//     <div className="main">
//       <div className="d-flex layout">
//         <div className="sidebar">
//           <div className="sidebar-header">
//             <h1 className="logo">dR.</h1>
//           </div>
//           <div className="menu">
//             {menuToBeRendered.map((menu) => {
//               const isActive = location.pathname === menu.path;
//               return (
//                 <div
//                   className={`d-flex menu-item ${
//                     isActive && "active-menu-item"
//                   }`}
//                 >
//                   <i className={menu.icon}></i>
//                   {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
//                 </div>
//               );
//             })}
//             <div
//                   className={`d-flex menu-item `} onClick={onLogout}
//                   >
              
//                   <i className="ri-logout-circle-line"></i>
//                   {!collapsed && <Link to="/login">Logout</Link>}
//                 </div>
//           </div>
//         </div>
//         <div className="content">
//           <div className="header">
//             {collapsed ? (
//               <i
//                 className="ri-menu-2-fill header-action-icon"
//                  onClick={() => setCollapsed(false)}
//               ></i>
//             ) : (
//               <i
//                 className="ri-close-fill header-action-icon"
//                 onClick={() => setCollapsed(true)}
//               ></i>
//             )}
//             <div className="d-flex align-items-center px-3">
//             <Badge
//                 count={user?.unseenNotifications?.length || 0 }
//                 onClick={() => navigate("/notifications")}
//               >
//                 <i className="ri-notification-2-fill header-action-icon px-3"></i>
//               </Badge>
//             <Link className="anchor mx-3" to='/Profile'>{user?.name}</Link>
//             </div>
//           </div>
//           <div className="body">{children}</div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Layout;
