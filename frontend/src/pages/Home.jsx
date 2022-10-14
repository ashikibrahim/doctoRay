import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import Layout from '../components/Layout';
import Header from '../components/Header';
import {Carousel} from 'antd'


function Home () {
 
  return (
    <>

<Header/>
<div style={{ paddingTop: "40px" }}>
        <h1 className="page-title mt-5"> homepage</h1>
        <hr />
  </div>
  </>
  );
}

export default Home