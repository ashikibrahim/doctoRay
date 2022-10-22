import React from 'react';
import {Card} from 'antd';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

function DoctorCard({doctor1}) {
  const navigate = useNavigate();
  return (
    
        <Card
        hoverable
        onClick={() => navigate(`/doctor-details/${doctor1._id}`)}
        style={{
          width: 300,
          borderRadius:"8px",
          height:300
          
          
        }}
        cover={<img alt="example" src={doctor1.image}/>}
      >
        <Meta  title={doctor1.firstName} description={doctor1.specialization} />
      </Card>
      )
    
}

export default DoctorCard

