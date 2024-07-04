import React from "react";
import "./adminhomepage.css";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from "./LeftSideBar";
import DateAndTime from "./DateAndTime";
import TrainerTable from "./AdminHomePageTrainerTable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const AdminHomePage = () => {
  const [graphTitle, setGraphTitle] = useState("View Trainer Statistics");
  const [key, setKey] = useState("blank");
  const [domainMax, setDomainMax] = useState(20);


  const viewworkshop = () => {
    setGraphTitle("Workshops Completed This Month");
    setKey("workshops_completed_this_month");
    setDomainMax(20);
  };
  const viewexperience = () => {
    setGraphTitle("Trainers' Experience");
    setKey("experience");
    setDomainMax(20);

  };
  const resetview = () => {
    setGraphTitle("View Trainer Statistics");
    setKey("blank");
    setDomainMax(0);
  };
  const viewtotal = () => {
    setGraphTitle("Total Workshops Completed");
    setKey("workshops_completed_total");
    setDomainMax(100);
  };

  const { trainer_data } = useFetch();

  const nav = useNavigate();
  const handleAdminWorkshopRequestPage = () => {
    nav("/AdminWorkshopRequestPage");
  };
  const handleAdminManageTrainerPage = () => {
    nav("/AdminManageTrainerPage");
  };

  return (
    <motion.div
      class="admin-home-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div class="left-panel">
        <Sidebar userprofilepic={userprofilepic} />
        <div class="dell-logo">
          <img src={dellacademylogo} alt="Dell Academy Logo" />
        </div>
      </div>
      <div class="middle-column">
        <div class="admin-home-page-title">
          <h4>Hi Dil, welcome back!</h4>
        </div>
        <div class="workshop-table">
          <button
            className="workshop-request-button"
            onClick={handleAdminWorkshopRequestPage}
          >
            Workshop Requests
          </button>
          <div class="workshop-table-content">
            <ul class="workshop-table-lists">
              <li class="workshop-table-list">
                <a href="#" class="wt-link">
                  <span class="link">
                    [ Pending Workshop Request ] Intro to Power Bi
                  </span>{" "}
                </a>
              </li>
              <li class="workshop-table-list">
                <a href="#" class="wt-link">
                  <span class="link">
                    [ Pending Workshop Request ] Intro to Computers
                  </span>
                </a>
              </li>
              <li class="workshop-table-list">
                <a href="#" class="wt-link">
                  <span class="link">
                    [ Pending Workshop Request ] Intro to Excel
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="trainer-table">
          <button
            className="manage-trainers-button"
            onClick={handleAdminManageTrainerPage}
          >
            Manage Trainers
          </button>
          <TrainerTable />
        </div>
      </div>
      <div class="right-column">
        <div class="admin-home-datetime">
          <DateAndTime />
        </div>
        <div class="admin-graphs">
          {/* Placeholder for future table component */}
          {/* <SortableTable /> */}
          <div className="graph_buttons_div">
            <button className="graph_buttons" onClick={viewtotal}>
              Total Workshops
            </button>
            <button className="graph_buttons" onClick={viewworkshop}>
              Monthly Workshops
            </button>
            <button className="graph_buttons" onClick={viewexperience}>
              Years of Experience
            </button>
            <button className="graph_buttons" onClick={resetview}>
              Reset
            </button>
          </div>

          <h5>{graphTitle}</h5>
       
          <BarChart
            width={600}
            height={300}
            data={trainer_data}
            margin={{
              top: 20,
              right: 50,
              left: 0,
              bottom: 10,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
            <YAxis interval="preserveStartEnd" domain={[0, domainMax]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={key}
              fill="#0083CA"
              background={{ fill: "#f5f5f5" }}
            />
            {/* <Bar
              dataKey = {key}
              fill="#0083CA"
              background={{ fill: "#f5f5f5" }}
            /> */}
          </BarChart>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminHomePage;
