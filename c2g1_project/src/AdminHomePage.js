import React from "react";
import useFetch from "./components/useFetch";
import useAxiosGet from "./api/useAxiosGet.jsx";
import "./styles/adminhomepage.css";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { config } from "./config/config.js";
import { endpoints } from "./config/endpoints.js";
import TopLeftSideBar from "./components/TopLeftSideBar.js";
import {
  Area,
  AreaChart,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Line,
  LineChart,
} from "recharts";

const AdminHomePage = () => {
  const [trainergraphsTitle, setTrainerGraphsTitle] = useState(
    "View Trainer statistics"
  );
  const [workshopgraphsTitle, setWorkshopGraphsTitle] = useState(
    "Workshop Completed Over the Years"
  );

  const [key, setKey] = useState("workshops_completed_total");
  const [key_ws, setKeyWS] = useState("completed");

  const [domainMax, setDomainMax] = useState(0);

  const viewworkshop = () => {
    setTrainerGraphsTitle("Workshops Completed This Month per Trainer");
    setKey("workshops_completed_this_month");
    setDomainMax(20);
  };
  const viewongoing = () => {
    setTrainerGraphsTitle("Ongoing Workshops per Trainer");
    setKey("ongoing_workshops");
    setDomainMax(10);
  };
  const viewexperience = () => {
    setTrainerGraphsTitle("Trainers' Experience");
    setKey("experience");
    setDomainMax(20);
  };
  const resetview = () => {
    setTrainerGraphsTitle("View Trainer Statistics");
    setKey("blank");
    setDomainMax(0);
  };

  const viewtotal = () => {
    setTrainerGraphsTitle("Total Workshops Completed per Trainer");
    setKey("workshops_completed_total");
    setDomainMax(100);
  };

  // CALLING DATA FROM JSON
  const { trainer_data, workshop_data, today_data } = useFetch();

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

  return data !== null && data.role === "admin" ? (
    <motion.div
      className="admin-home-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-panel">
        <TopLeftSideBar />
      </div>
      <div className="left-column">
        <div className="admin-home-page-title">
        </div>

        {/* Workshop summary starts here */}
        <div className="workshop-table">
          {" "}
          <div className="workshop-table-title">
            <h4>This is today's workshops' statistics: </h4>
          </div>
          {today_data && today_data[0] ? (
            <>
              <div className="workshopstoday">
                <h2>{today_data[0].ongoingworkshopstoday}</h2>
                <h5>Ongoing workshops today</h5>
              </div>
              <div className="trainersworking">
                <h2>{today_data[0].trainertoday}</h2>
                <h5>Trainers conducting across all workshops</h5>
              </div>
              <div className="workshopattendees">
                <h2>{today_data[0].participantstoday}</h2>
                <h5>Total Participants across all workshops</h5>
              </div>
              <div className="attendancepercentage">
                <h2>{today_data[0].attendance}</h2>
                <h5>Today's Attendance</h5>
              </div>
            </>
          ) : (
            <div>Calculating all data... This may take awhile...</div>
          )}
        </div>
        {/* Workshop summary ends here */}
        <div className="breakdown-of-attendance-div">
          <h5>Breakdown of Attendance in 2024</h5>
          <AreaChart
            width={500}
            height={200}
            data={workshop_data}
            margin={{ top: 10, right: 80, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0083ca" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0083ca" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Expected_Attendance_2024_Per_Month"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <Area
              type="monotone"
              dataKey="Actual_Attendance_2024_Per_Month"
              stroke="#0083ca"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      </div>

      {/* Graphs nonsense starts here */}
      <div className="right-column">
        <div className="admin-graphs">
          {/* Right column MAIN DIV NUMBER 1 */}
          <div className="workshop-stats">
            <h5>{workshopgraphsTitle}</h5>
            <LineChart
              width={920}
              height={250}
              data={workshop_data}
              margin={{
                top: 30,
                right: 50,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={0} textAnchor="end" dy={0} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="2024" stroke="black" />
              <Line type="monotone" dataKey="2023" stroke="red" />
              <Line type="monotone" dataKey="2022" stroke="purple" />
              <Line type="monotone" dataKey="2021" stroke="blue" />
              <Line
                type="monotone"
                dataKey="projection"
                stroke="#37cc5c"
                label={{ position: "top" }}
              />
              <Legend />
            </LineChart>
          </div>

          {/* Right column MAIN DIV NUMBER 2 */}
          <div className="trainer-stats">
            {" "}
            <h5>{trainergraphsTitle}</h5>
          </div>
          <>
            <div className="graph_buttons_div">
              <button className="graph_buttons" onClick={viewtotal}>
                Total Workshops Completed
              </button>
              <button className="graph_buttons" onClick={viewworkshop}>
                Workshops Completed
              </button>
              <button className="graph_buttons" onClick={viewongoing}>
                Ongoing Workshops
              </button>
              <button className="graph_buttons" onClick={viewexperience}>
                Years of Experience
              </button>
              <button className="graph_buttons" onClick={resetview}>
                Reset
              </button>
            </div>

            <BarChart
              width={920}
              height={240}
              data={trainer_data}
              margin={{
                top: 30,
                right: 50,
                left: 0,
                bottom: 50,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                padding={{ left: 10, right: 10 }}
                angle={-60}
                textAnchor="end"
                dy={0}
              />
              <YAxis interval="preserveStartEnd" domain={[0, domainMax]} />
              <Tooltip />
              <Bar
                dataKey={key}
                fill="#0083CA"
                background={{ fill: "#ffffff" }}
                label={{ position: "top" }}
              />
            </BarChart>
          </>
        </div>
      </div>
    </motion.div>
  ) : (
    <div>Not logged in</div>
  );
};

export default AdminHomePage;
