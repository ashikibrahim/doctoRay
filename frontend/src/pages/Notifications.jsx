import React, { useState } from "react";
import { Tabs } from "antd";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";
import Header from "../components/Header";

function Notifications() {
  const [markAsSeen, setMarkAsSeen] = useState();

  const { user } = useSelector((state) => state.user);
  console.log(user, "NNNNNNNNNNNNNNNNNNNNNN");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // unseenNotifications
  const unseenNotifications = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/unseen-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.data, "unseen response99999999999");
        setMarkAsSeen(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(setUser(response.data.data), "setuser");
      console.log(response.data, "111111");
      console.log(response.data.data, "data.data111111");
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data, "hhhhhhhhhreposnsenotification");
        setMarkAsSeen(response.data.data);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(setUser(response.data.data), "setuser");
      console.log(response.data, "111111");
      console.log(response.data.data, "data.data111111");
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
        // dispatch(setUser(response.data.data));
        setMarkAsSeen(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    unseenNotifications();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
      <div style={{ paddingTop: "40px" }}>
        <h1 className="page-title mt-5">Notifications</h1>
        <hr />
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={0}>
            <div className="d-flex justify-content-end">
              <h1 className="anchor" onClick={() => markAllAsSeen()}>
                Mark all as seen
              </h1>
            </div>

            {markAsSeen?.unseenNotifications.map((notification) => (
              <div
                className="card p-2 mt-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="seen" key={1}>
            <div className="d-flex justify-content-end">
              <h1 className="anchor" onClick={() => deleteAll()}>
                Delete all
              </h1>
            </div>
            {markAsSeen?.seenNotifications.map((notification) => (
              <div
                className="card p-2 mt-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      </div>
    </>
  );
}

export default Notifications;
