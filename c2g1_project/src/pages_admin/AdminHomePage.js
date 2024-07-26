import React, { useState } from "react";
import useFetch from "../components/useFetch.js";
import useAxiosGet from "../api/useAxiosGet.jsx";
import "../styles/adminhomepage.css"; // Ensure this path is correct
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import TopLeftSideBar from "../components/TopLeftSideBar.js";
import {
  Pie,
  PieChart,
  Cell,
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomBar from "../components/CustomBar"; // Import the custom bar shape

const AdminHomePage = () => {
  ///////////////////////////////////////////////////////////
  // Stuffs to beautify the graphs
  ///////////////////////////////////////////////////////////
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    value,
    fill, // Add fill property to get the color
  }) => {
    const radius = outerRadius + 30; // Adjust the distance of the label from the pie chart
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill={fill} // Use the fill color for the text
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {`${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  ///////////////////////////////////////////////////////////
  // States
  ///////////////////////////////////////////////////////////
  const [selectedYear, setSelectedYear] = useState("total");
  const [trainerGraphsTitle, setTrainerGraphsTitle] = useState(
    "View Trainer Statistics"
  );
  const [workshopGraphsTitle, setWorkshopGraphsTitle] = useState(
    "Trend of workshops requests and total potential deal sizes over time"
  );
  const [key, setKey] = useState("workshops_completed_total");
  const [keyWs, setKeyWs] = useState("completed");
  const [domainMax, setDomainMax] = useState(0);
  const [currentChart, setCurrentChart] = useState("workshopTypes");
  const [visibleYears, setVisibleYears] = useState({
    2022: true,
    2023: true,
    2024: true,
  });

  // ⚠️⚠️⚠️ FOR THE BACKENDS GUYS!!! ⚠️⚠️⚠️
  ///////////////////////////////////////////////////////////
  // HARDCODED DATA
  ///////////////////////////////////////////////////////////
  const totalPieData = [
    // this one is a sum of all workshops that have the status "accepted", "rejected", "pending"
    { name: "Workshops Accepted", value: 271 },
    { name: "Workshops Rejected", value: 125 },
    { name: "Pending", value: 13 },
  ];

  // 2022 and 2023 has no pending workshops because it should have been resolved
  const yearPieData = {
    // these are the sum of all accepted and rejected workshops for 2022
    // might need a new field for workshops? like year?
    2022: [  
      { name: "Workshops Accepted", value: 90 },
      { name: "Workshops Rejected", value: 41 },
      { name: "Pending", value: 0 },
    ],
    2023: [
      { name: "Workshops Accepted", value: 79 },
      { name: "Workshops Rejected", value: 35 },
      { name: "Pending", value: 0 },
    ],
    2024: [
      { name: "Workshops Accepted", value: 102 },
      { name: "Workshops Rejected", value: 49 },
      { name: "Pending", value: 13 },
    ],
  };

  const COLORS = ["#88D66C", "#FF4C4C", "#FFD35A"];

  const workshopTypesData = [
    // {name: "Workshops Completed", dealSize: 10000},
    // Idea is to first filter all workshops by types, then add all dealsize together
    { name: "Business Value Discovery", dealSize: 9520 },
    { name: "AI Platform", dealSize: 6570 },
    { name: "Infrastructure and Demo", dealSize: 18590 },
  ];

  const clientTypesData = [
    // same for client type
    { name: "Executive", dealSize: 12570 },
    { name: "Technical", dealSize: 19850 },
  ];

  const workshopTrendData = [
    {
      // not sure if this is doable for backend, need discuss
      // what are the fields right now
      month: "Jan",
      workshopRequests2022: 10,
      dealSize2022: 2000,
      workshopRequests2023: 15,
      dealSize2023: 4000,
      workshopRequests2024: 20,
      dealSize2024: 5000,
    },
    {
      month: "Feb",
      workshopRequests2022: 30,
      dealSize2022: 7000,
      workshopRequests2023: 50,
      dealSize2023: 12000,
      workshopRequests2024: 60,
      dealSize2024: 14000,
    },
    {
      month: "Mar",
      workshopRequests2022: 50,
      dealSize2022: 10000,
      workshopRequests2023: 70,
      dealSize2023: 18000,
      workshopRequests2024: 80,
      dealSize2024: 20000,
    },
    {
      month: "Apr",
      workshopRequests2022: 20,
      dealSize2022: 5000,
      workshopRequests2023: 30,
      dealSize2023: 8000,
      workshopRequests2024: 40,
      dealSize2024: 10000,
    },
    {
      month: "May",
      workshopRequests2022: 60,
      dealSize2022: 15000,
      workshopRequests2023: 80,
      dealSize2023: 20000,
      workshopRequests2024: 90,
      dealSize2024: 22000,
    },
    {
      month: "Jun",
      workshopRequests2022: 40,
      dealSize2022: 10000,
      workshopRequests2023: 60,
      dealSize2023: 15000,
      workshopRequests2024: 70,
      dealSize2024: 17000,
    },
    {
      month: "Jul",
      workshopRequests2022: 80,
      dealSize2022: 18000,
      workshopRequests2023: 90,
      dealSize2023: 22000,
      workshopRequests2024: 100,
      dealSize2024: 25000,
    },
    {
      month: "Aug",
      workshopRequests2022: 30,
      dealSize2022: 7000,
      workshopRequests2023: 40,
      dealSize2023: 10000,
      workshopRequests2024: 50,
      dealSize2024: 13000,
    },
    {
      month: "Sep",
      workshopRequests2022: 90,
      dealSize2022: 20000,
      workshopRequests2023: 100,
      dealSize2023: 25000,
      workshopRequests2024: 110,
      dealSize2024: 28000,
    },
    {
      month: "Oct",
      workshopRequests2022: 50,
      dealSize2022: 12000,
      workshopRequests2023: 65,
      dealSize2023: 15000,
      workshopRequests2024: 75,
      dealSize2024: 18000,
    },
    {
      month: "Nov",
      workshopRequests2022: 60,
      dealSize2022: 15000,
      workshopRequests2023: 80,
      dealSize2023: 20000,
      workshopRequests2024: 90,
      dealSize2024: 22000,
    },
    {
      month: "Dec",
      workshopRequests2022: 20,
      dealSize2022: 5000,
      workshopRequests2023: 25,
      dealSize2023: 6000,
      workshopRequests2024: 30,
      dealSize2024: 8000,
    },
  ];

  ///////////////////////////////////////////////////////////
  // Functions
  ///////////////////////////////////////////////////////////
  const toggleYearVisibility = (year) => {
    setVisibleYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const viewWorkshop = () => {
    setTrainerGraphsTitle("Workshops Completed This Month / Trainer");
    setKey("workshops_completed_this_month");
    setDomainMax(10);
  };
  const viewOngoing = () => {
    setTrainerGraphsTitle("Ongoing Workshops / Trainer");
    setKey("ongoing_workshops");
    setDomainMax(10);
  };

  ///////////////////////////⚠️⚠️⚠️ ///////////////////////////
  // This one need change //
  const viewTotalTrainerUtilization = () => {
    setTrainerGraphsTitle("Total Trainers' Utilization");
    setKey("experience");
    setDomainMax(20);
  };
  ///////////////////////////⚠️⚠️⚠️///////////////////////////

  const resetView = () => {
    setTrainerGraphsTitle("View Trainer Statistics");
    setKey("blank");
    setDomainMax(0);
  };

  const viewTotal = () => {
    setTrainerGraphsTitle("Total Workshops Completed / Trainer");
    setKey("workshops_completed_total");
    setDomainMax(100);
  };

  const toggleChart = () => {
    setCurrentChart((prev) =>
      prev === "workshopTypes" ? "clientTypes" : "workshopTypes"
    );
  };

  const { trainer_data, today_data } = useFetch();

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

  ///////////////////////////////////////////////////////////
  // Render
  ///////////////////////////////////////////////////////////
  return data !== null && data.role === "admin" ? (
    <motion.div
      className="admin-home-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="top-panel">
        <TopLeftSideBar />
      </div>
      <div className="columns-container">
        <div className="column">
          <div className="admin-home-page-title"></div>

          {/* ⚠️⚠️⚠️ PIE CHART STARTS HERE ⚠️⚠️⚠️ */}
          <div className="chart-container">
            <div className="chart-title">Breakdown of Workshop Requests</div>

            <div className="year-buttons-container">
              {["2022", "2023", "2024", "total"].map((year) => (
                <button
                  key={year}
                  className={`year-button ${
                    selectedYear === year ? "active" : ""
                  }`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year === "total" ? "Total" : year}
                </button>
              ))}
            </div>
            <div className="total-requests">
              <text
                x={350}
                y={330}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Total Requests:{" "}
                {(selectedYear === "total"
                  ? totalPieData
                  : yearPieData[selectedYear]
                ).reduce((acc, curr) => acc + curr.value, 0)}
              </text>
            </div>
            <div className="workshop-request-piechart">
              <PieChart width={700} height={350}>
                <Pie
                  data={
                    selectedYear === "total"
                      ? totalPieData
                      : yearPieData[selectedYear]
                  }
                  cx={350}
                  cy={150}
                  labelLine={true}
                  label={renderCustomLabel}
                  outerRadius={130}
                  innerRadius={50}
                  fill="#28abf1"
                  dataKey="value"
                  stroke="#000" // Add stroke color
                  strokeWidth={2} // Add stroke width
                >
                  {(selectedYear === "total"
                    ? totalPieData
                    : yearPieData[selectedYear]
                  ).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      label={renderCustomLabel({
                        fill: COLORS[index % COLORS.length],
                      })} // Pass fill color
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          {/* ⚠️⚠️⚠️ PIPELINE BAR GRAPHS STARTS HERE ⚠️⚠️⚠️ */}
          <div className="chart-container">
            <div className="chart-title">
              Total Pipeline (USD) Associated with the Client/ Workshop
            </div>
            <div className="chart-toggle-button">
              <button className="toggle-button" onClick={toggleChart}>
                {currentChart === "workshopTypes"
                  ? "Show Client Types"
                  : "Show Workshop Types"}
              </button>
            </div>
            <BarChart
              width={700}
              height={400}
              data={
                currentChart === "workshopTypes"
                  ? workshopTypesData
                  : clientTypesData
              }
              margin={{ top: 20, right: 10, left: 20, bottom: 0 }}
              strokeWidth={2}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="dealSize"
                fill="#28abf1"
                label={{ position: "top" }}
                shape={<CustomBar />} // Use the custom bar shape
              />
            </BarChart>
          </div>
        </div>

        {/* ⚠️⚠️⚠️ LINE GRAPHS STARTS HERE ⚠️⚠️⚠️ */}
        <div className="column-right">
          <div className="chart-container">
            <div className="chart-title">{workshopGraphsTitle}</div>
            <div className="year-buttons-container">
              {Object.keys(visibleYears).map((year) => (
                <button
                  key={year}
                  className={`year-button ${
                    visibleYears[year] ? "active" : ""
                  }`}
                  onClick={() => toggleYearVisibility(year)}
                >
                  {year}
                </button>
              ))}
            </div>
            <div className="chart-title-2">Workshop Requests Per Year</div>
            <LineChart
              width={800}
              height={250}
              data={workshopTrendData}
              margin={{
                top: 30,
                right: 50,
                left: 0,
                bottom: 20,
              }}
              strokeWidth={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={0} textAnchor="end" dy={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              {visibleYears["2022"] && (
                <Line
                  type="monotone"
                  dataKey="workshopRequests2022"
                  stroke="green"
                  name="Workshop Requests 2022"
                  strokeWidth={2}
                />
              )}
              {visibleYears["2023"] && (
                <Line
                  type="monotone"
                  dataKey="workshopRequests2023"
                  stroke="#28abf1"
                  name="Workshop Requests 2023"
                  strokeWidth={2}
                />
              )}
              {visibleYears["2024"] && (
                <Line
                  type="monotone"
                  dataKey="workshopRequests2024"
                  stroke="red"
                  name="Workshop Requests 2024"
                  strokeWidth={2}
                />
              )}
            </LineChart>
            <div className="chart-title-2">
              Total Potential Deal Size Per Year
            </div>

            <LineChart
              width={800}
              height={250}
              data={workshopTrendData}
              margin={{
                top: 30,
                right: 50,
                left: 0,
                bottom: 20,
              }}
              strokeWidth={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={0} textAnchor="end" dy={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              {visibleYears["2022"] && (
                <Line
                  type="monotone"
                  dataKey="dealSize2022"
                  stroke="green"
                  name="Deal Size 2022"
                  strokeWidth={2}
                />
              )}
              {visibleYears["2023"] && (
                <Line
                  type="monotone"
                  dataKey="dealSize2023"
                  stroke="#28abf1"
                  name="Deal Size 2023"
                  strokeWidth={2}
                />
              )}
              {visibleYears["2024"] && (
                <Line
                  type="monotone"
                  dataKey="dealSize2024"
                  stroke="red"
                  name="Deal Size 2024"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </div>

          {/* ⚠️⚠️⚠️ TRAINER STATISTICS BAR GRAPHS STARTS HERE ⚠️⚠️⚠️ */}
          <div className="chart-container">
            <div className="chart-title">{trainerGraphsTitle}</div>
            <div className="buttons-container">
              <button className="graph-button" onClick={viewTotal}>
                Workshops Completed (Total)
              </button>
              <button className="graph-button" onClick={viewWorkshop}>
                Workshops Completed (Month)
              </button>
              <button className="graph-button" onClick={viewOngoing}>
                Ongoing Workshops
              </button>
              <button
                className="graph-button"
                onClick={viewTotalTrainerUtilization}
              >
                Total Trainers' Utilization
              </button>
              <button className="graph-button" onClick={resetView}>
                Reset
              </button>
            </div>
            <BarChart
              width={800}
              height={250}
              data={trainer_data}
              margin={{
                top: 30,
                right: 50,
                left: 0,
                bottom: 50,
              }}
              barSize={20}
              strokeWidth={2}
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
                fill="#28abf1"
                background={{ fill: "#ffffff" }}
                label={{ position: "top" }}
                shape={<CustomBar />} // Use the custom bar shape
              />
            </BarChart>
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <div>Not logged in</div>
  );
};

export default AdminHomePage;
