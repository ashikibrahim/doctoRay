import Layout from "../../components/Layout";
import { Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import Header from "../../components/Header";
import moment from "moment";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

function UserList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // block/unblock  user
  const changeUserStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-user-account-status",
        { userid: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getUserData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.isBlock === "unBlock" && (
            <h1
              className="anchor"
              onClick={() => changeUserStatus(record, "block")}
            >
              <Button variant="danger">Block</Button>
            </h1>
          )}
          {record.isBlock === "block" && (
            <h1
              className="anchor"
              onClick={() => changeUserStatus(record, "unBlock")}
            >
              <Button variant="success">Block</Button>
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div style={{ paddingTop: "40px" }}>
        <h1 className="page-header mt-5">users List</h1>
        <hr />
        <Table columns={columns} dataSource={users} />
      </div>
    </>
  );
}

export default UserList;
