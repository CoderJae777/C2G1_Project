import React from "react";
import "./styles/adminhomepage.css";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import DateAndTime from "./DateAndTime";
import TrainerTable from "./AdminHomePageTrainerTable";
import { motion } from "framer-motion";
import { useState } from "react";
import useFetch from "./components/useFetch";
import About from "./components/about.js";
import { Testimonials } from "./components/Testimonials.js";
import { Team } from "./components/Team.js";
import useAxiosGet from "./api/useAxiosGet.jsx";
import { config } from "./config/config.js";
import { endpoints } from "./config/endpoints.js";

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
import TopLeftSideBar from "./components/TopLeftSideBar.js";

const AdminHomePage = () => {
  const [graphTitle, setGraphTitle] = useState("View Trainer Statistics");
  const [key, setKey] = useState("blank");
  const [domainMax, setDomainMax] = useState(0);
  const [showWorkshopStats, setShowWorkshopStats] = useState(false);
  const [showExperienceStats, setShowExperienceStats] = useState(false);

  const viewworkshop = () => {
    setGraphTitle("Workshops Completed This Month");
    setKey("workshops_completed_this_month");
    setDomainMax(20);
  };
  const viewongoing = () => {
    setGraphTitle("Ongoing Workshops");
    setKey("ongoing_workshops");
    setDomainMax(10);
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
    setShowExperienceStats(false);
    setShowWorkshopStats(false);
  };

  const resetgraph = () => {
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

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

  return data !== null && data.status === true ? (
    <motion.div
      className="admin-home-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="left-panel">
        <TopLeftSideBar />
      </div>
      <div className="middle-column">
        <div className="admin-home-page-title">
          <img src={userprofilepic} alt="User Profile Pic" />

          <h4>Hi Dil, welcome back!</h4>
        </div>
        <div className="workshop-table">
          <button
            className="workshop-request-button"
            onClick={handleAdminWorkshopRequestPage}
          >
            Workshop Requests
          </button>
          <div className="workshop-table-content">
            <ul className="workshop-table-lists">
              <li className="workshop-table-list">
                <a href="#" className="wt-link">
                  <span className="link">
                    [ Pending Workshop Request ] Intro to Power Bi
                  </span>{" "}
                </a>
              </li>
              <li className="workshop-table-list">
                <a href="#" className="wt-link">
                  <span className="link">
                    [ Pending Workshop Request ] Intro to Computers
                  </span>
                </a>
              </li>
              <li className="workshop-table-list">
                <a href="#" className="wt-link">
                  <span className="link">
                    [ Pending Workshop Request ] Intro to Excel
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="trainer-table">
          <button
            className="manage-trainers-button"
            onClick={handleAdminManageTrainerPage}
          >
            Manage Trainers
          </button>
          <TrainerTable />
        </div>
      </div>
      <div className="right-column">
        <div className="admin-home-datetime">
          <DateAndTime />
        </div>
        <div className="admin-graphs">
          <h5>{graphTitle}</h5>

          {/* Both buttons (Workshop Statistics and Trainer's History) are only displayed 
          when neither showWorkshopStats nor showExperienceStats is true. 
          i.e. if one is true, none of the buttons will show --> use this to hide 
          them once clicked*/}

          {!showWorkshopStats && !showExperienceStats && (
            <>
              <button
                className="graph_chooser"
                onClick={() => setShowWorkshopStats(true)}
              >
                Workshop Statistics
              </button>
              <button
                className="graph_chooser"
                onClick={() => setShowExperienceStats(true)}
              >
                Trainer's History
              </button>
            </>
          )}
          {showWorkshopStats && (
            <>
              {/* when back button is clicked, it resets all the graphs and goes back*/}
              <button className="graph_chooser" onClick={resetview}>
                Back
              </button>
              <div className="graph_buttons_div">
                <button className="graph_buttons" onClick={viewtotal}>
                  Total Workshops Completed
                </button>
                <button className="graph_buttons" onClick={viewworkshop}>
                  July Workshops Completed
                </button>
                <button className="graph_buttons" onClick={viewongoing}>
                  Ongoing Workshops
                </button>
                <button className="graph_buttons" onClick={resetgraph}>
                  Reset
                </button>
              </div>

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
                  label={{ position: "top" }}
                />
              </BarChart>
            </>
          )}

          {showExperienceStats && (
            <>
              {/* when back button is clicked, it resets all the graphs and goes back*/}
              <button className="graph_chooser" onClick={resetview}>
                Back
              </button>
              <div className="graph_buttons_div">
                <button className="graph_buttons" onClick={viewexperience}>
                  Years of Experience
                </button>
                <button className="graph_buttons" onClick={resetgraph}>
                  Reset
                </button>
              </div>

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
                  label={{ position: "top" }}
                />
              </BarChart>
            </>
          )}
        </div>
      </div>
    </motion.div>
  ) : (
    <div>Not logged in</div>
  );
};

export default AdminHomePage;
