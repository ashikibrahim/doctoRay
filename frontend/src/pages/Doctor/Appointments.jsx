import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const params =useParams();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/doctor/get-doctor-appoitments",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        console.log(
          response.data,
          " oooooooooooooooooooooooooooooooooooooooooooooooo"
        );
        setAppointments(response.data.data);
        console.log(
          appointments,
          "ppppppppppppppppppppppppppppppppppppppppppppppppppppp"
        );
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  //   const changeDoctorStatus = async (record, status) => {
  //     try {
  //       dispatch(showLoading());
  //       const response = await axios.post(
  //         "/api/admin/change-doctor-account-status",
  //         { doctorId: record._id, userId: record.userId, status: status },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       dispatch(hideLoading());
  //       if (response.data.success) {
  //         toast.success(response.data.message);
  //         getDoctorsData();
  //       }
  //     } catch (error) {
  //       toast.error("error changing doctor status");
  //       dispatch(hideLoading());
  //     }
  //   };

  const columns = [
    {
      title: "patient Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    //     {
    //       title: "Image",
    //       dataIndex: "image",

    //       render: (text, record) => <img alt={record.image} src={record.image} style={{ width: "150px", height: "70px", objectFit: "contain" }} />
    //   },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <Button
              variant="danger"
              //   onClick={() => changeDoctorStatus(record, "Approved")}
            >
              Approve
            </Button>
          )}
          {record.status === "Approved" && (
            <Button
              variant="success"
              //   onClick={() => changeDoctorStatus(record, "blocked")}
            >
              {/* {" "} */}
              reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <Header />
      <div style={{ paddingTop: "40px" }}>
        <h1 className="page-header mt-5">Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </div>
    </>
  );
}

export default Appointments;
