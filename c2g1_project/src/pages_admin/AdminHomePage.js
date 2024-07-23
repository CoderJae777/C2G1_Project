import React, { useEffect, useState } from "react";
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
  Line,
  LineChart,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHomePage = () => {
  const [trainerGraphsTitle, setTrainerGraphsTitle] = useState(
    "View Trainer Statistics"
  );
  const [workshopGraphsTitle, setWorkshopGraphsTitle] = useState(
    "Trend of workshops requests and total potential deal sizes over time"
  );

  const [key, setKey] = useState("workshops_completed_total");
  const [keyWs, setKeyWs] = useState("completed");

  const [domainMax, setDomainMax] = useState(0);
  const [currentYear, setCurrentYear] = useState("2024");

  const [currentChart, setCurrentChart] = useState("workshopTypes");

  const viewWorkshop = () => {
    setTrainerGraphsTitle("Workshops Completed This Month per Trainer");
    setKey("workshops_completed_this_month");
    setDomainMax(20);
  };
  const viewOngoing = () => {
    setTrainerGraphsTitle("Ongoing Workshops per Trainer");
    setKey("ongoing_workshops");
    setDomainMax(10);
  };
  const viewExperience = () => {
    setTrainerGraphsTitle("Trainers' Experience");
    setKey("experience");
    setDomainMax(20);
  };
  const resetView = () => {
    setTrainerGraphsTitle("View Trainer Statistics");
    setKey("blank");
    setDomainMax(0);
  };

  const viewTotal = () => {
    setTrainerGraphsTitle("Total Workshops Completed per Trainer");
    setKey("workshops_completed_total");
    setDomainMax(100);
  };

  const pieData = [
    { name: "Workshops Accepted", value: 55 },
    { name: "Workshops Rejected", value: 35 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = ["#399918", "#E4003A", "#FF8225"];

  const workshopTypesData = [
    { name: "Business Value Discovery", dealSize: 10000 },
    { name: "AI Platform", dealSize: 5000 },
    { name: "Infrastructure and Demo", dealSize: 20000 },
  ];

  const clientTypesData = [
    { name: "Type A", dealSize: 10000 },
    { name: "Type B", dealSize: 25000 },
  ];

  const toggleChart = () => {
    setCurrentChart((prev) =>
      prev === "workshopTypes" ? "clientTypes" : "workshopTypes"
    );
  };

  const { trainer_data, today_data } = useFetch();

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );


  const workshopTrendData = [
    { month: "Jan", workshopRequests2024: 20, dealSize2024: 5000, workshopRequests2023: 15, dealSize2023: 4000 },
    { month: "Feb", workshopRequests2024: 60, dealSize2024: 14000, workshopRequests2023: 50, dealSize2023: 12000 },
    { month: "Mar", workshopRequests2024: 80, dealSize2024: 20000, workshopRequests2023: 70, dealSize2023: 18000 },
    { month: "Apr", workshopRequests2024: 40, dealSize2024: 10000, workshopRequests2023: 30, dealSize2023: 8000 },
    { month: "May", workshopRequests2024: 90, dealSize2024: 22000, workshopRequests2023: 80, dealSize2023: 20000 },
    { month: "Jun", workshopRequests2024: 70, dealSize2024: 17000, workshopRequests2023: 60, dealSize2023: 15000 },
    { month: "Jul", workshopRequests2024: 100, dealSize2024: 25000, workshopRequests2023: 90, dealSize2023: 22000 },
    { month: "Aug", workshopRequests2024: 50, dealSize2024: 13000, workshopRequests2023: 40, dealSize2023: 10000 },
    { month: "Sep", workshopRequests2024: 110, dealSize2024: 28000, workshopRequests2023: 100, dealSize2023: 25000 },
    { month: "Oct", workshopRequests2024: 75, dealSize2024: 18000, workshopRequests2023: 65, dealSize2023: 15000 },
    { month: "Nov", workshopRequests2024: 90, dealSize2024: 22000, workshopRequests2023: 80, dealSize2023: 20000 },
    { month: "Dec", workshopRequests2024: 30, dealSize2024: 8000, workshopRequests2023: 25, dealSize2023: 6000 },
  ];

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

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

          <div className="chart-container">
            <div className="chart-title">Breakdown of Workshop Requests</div>
            <div className="total-requests">
              Total Requests:{" "}
              {pieData.reduce((acc, curr) => acc + curr.value, 0)}
            </div>
            <div className="workshop-request-piechart">
              <PieChart width={500} height={350}>
                <Pie
                  data={pieData}
                  cx={240}
                  cy={150}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={125}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-title">
              Total Pipeline Associated with the Client/ Workshop
            </div>
            <div className="chart-toggle-button">
              <button className="toggle-button" onClick={toggleChart}>
                {currentChart === "workshopTypes"
                  ? "Show Client Types"
                  : "Show Workshop Types"}
              </button>
            </div>
            <BarChart
              width={500}
              height={300}
              data={
                currentChart === "workshopTypes"
                  ? workshopTypesData
                  : clientTypesData
              }
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="dealSize" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        <div className="column-right">
          <div className="chart-container">
            <div className="chart-title">{workshopGraphsTitle}</div>
            <div className="year-buttons-container">
              <button
                className="year-button"
                onClick={() => handleYearChange("2024")}
              >
                2024
              </button>
              <button
                className="year-button"
                onClick={() => handleYearChange("2023")}
              >
                2023
              </button>
            </div>
            <div className="chart-title">Workshop Requests Per Year</div>
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
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={0} textAnchor="end" dy={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={`workshopRequests${currentYear}`}
                stroke="#8884d8"
                name={`Workshop Requests ${currentYear}`}
              />
            </LineChart>
            <div className="chart-title">Total Potential Deal Size Per Year</div>

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
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={0} textAnchor="end" dy={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={`dealSize${currentYear}`}
                stroke="#82ca9d"
                name={`Deal Size ${currentYear}`}
              />
            </LineChart>
          </div>

          <div className="chart-container">
            <div className="chart-title">{trainerGraphsTitle}</div>
            <div className="buttons-container">
              <button className="graph-button" onClick={viewTotal}>
                Total Workshops Completed
              </button>
              <button className="graph-button" onClick={viewWorkshop}>
                Workshops Completed
              </button>
              <button className="graph-button" onClick={viewOngoing}>
                Ongoing Workshops
              </button>
              <button className="graph-button" onClick={viewExperience}>
                Years of Experience
              </button>
              <button className="graph-button" onClick={resetView}>
                Reset
              </button>
            </div>
            <BarChart
              width={800}
              height={430}
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
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <div>Not logged in</div>
  );
};

export default AdminHomePage;
