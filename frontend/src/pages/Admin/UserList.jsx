import Layout from "../../components/Layout";
import { Table, Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import Header from "../../components/Header";

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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          
         
        </div>
      ),
    },
  ];

  return (
    <>
    <Header/>
    <div style={{paddingTop:"40px"}}>
      <h1 className="page-header mt-5">users List</h1>
      <hr />
      <Table columns={columns} dataSource={users} />
      </div>
    </>
  );
}

export default UserList;
