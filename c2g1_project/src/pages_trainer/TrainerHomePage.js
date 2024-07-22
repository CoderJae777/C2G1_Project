import React, { useState } from "react";
import useFetch from "../components/useFetch.js";
import useAxiosGet from "../api/useAxiosGet.jsx";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import TopLeftSideBar from "../components/TrainerTopLeftSideBar.js";
import TrainerScheduleCalendar from "../components/TrainerScheduleCalendar.js";
import "../styles/trainerhomepage.css";
import {
    Area,
    AreaChart,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const TrainerHomePage = () => {
    const [trainergraphsTitle, setTrainerGraphsTitle] = useState("View Trainer statistics");
    const [workshopgraphsTitle, setWorkshopGraphsTitle] = useState("Workshop Completed Over the Years");
    const [key, setKey] = useState("workshops_completed_total");
    const [key_ws, setKeyWS] = useState("completed");
    const [domainMax, setDomainMax] = useState(0);
    const [workshop, setWorkshop] = useState("");
    const [workHours, setWorkHours] = useState(["", "", "", ""]);
    const [utilisationDetails, setUtilisationDetails] = useState(["", "", "", ""]);

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

    const handleWorkHoursChange = (index, value) => {
        const newWorkHours = [...workHours];
        newWorkHours[index] = value;
        setWorkHours(newWorkHours);
    };

    const handleUtilisationDetailsChange = (index, value) => {
        const newUtilisationDetails = [...utilisationDetails];
        newUtilisationDetails[index] = value;
        setUtilisationDetails(newUtilisationDetails);
    };

    const handleSubmit = () => {
        // Clear all fields
        setWorkshop("");
        setWorkHours(["", "", "", ""]);
        setUtilisationDetails(["", "", "", ""]);
    };

    return data !== null && data.role === "trainer" ? (
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
                <div className="admin-home-page-title"></div>

                {/* Workshop summary starts here */}
                <div className="workshop-table">
                    {" "}
                    <div className="workshop-table-title">
                        <h4>This is today's workshops' statistics: </h4>
                    </div>
                    {today_data && today_data[0] ? (
                        <>
                            <div className="workshopstoday">
                                <h2 className="today_data">{today_data[0].ongoingworkshopstoday}</h2>
                                <h5>Ongoing workshops today</h5>
                            </div>
                            <div className="trainersworking">
                                <h2 className="today_data">{today_data[0].trainertoday}</h2>
                                <h5>Trainers conducting across all workshops</h5>
                            </div>
                            <div className="workshopattendees">
                                <h2 className="today_data">{today_data[0].participantstoday}</h2>
                                <h5>Total Participants across all workshops</h5>
                            </div>
                            <div className="attendancepercentage">
                                <h2 className="today_data">{today_data[0].attendance}</h2>
                                <h5>Attended Today</h5>
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
                    <h1>Update Work Hours</h1>
                    <select
                        id="request-workshop-sel"
                        value={workshop}
                        onChange={(e) => setWorkshop(e.target.value)}
                        className="form_control"
                        onFocus={() => {
                            document.getElementById("request-workshop-sel").size = "1";
                        }}
                        onBlur={() => {
                            document.getElementById("request-workshop-sel").size = "1";
                        }}
                    >
                        <option value="Workshop">-- Workshop --</option>
                        <option value="Workshop A">Intro to Python</option>
                        <option value="Workshop B">Intro to Java 21</option>
                        <option value="Workshop B">Intro to AI</option>
                        <option value="Workshop B">Intro to C hashtag</option>
                    </select>
                    <h3> Please key in the breakdown on utilization hours for each workshop</h3>
                    {[0, 1, 2, 3].map((index) => (
                        <div className="work_hours_row" key={index}>
                            <div className="work_hours_num">
                                <h5>Work Hours</h5>
                                <input
                                    placeholder="0"
                                    value={workHours[index]}
                                    onChange={(e) => handleWorkHoursChange(index, e.target.value)}
                                />
                            </div>
                            <div className="work_hours_desc">
                                <h5>Utilisation Details</h5>
                                <textarea
                                    className="work_hours_desc_area"
                                    value={utilisationDetails[index]}
                                    onChange={(e) => handleUtilisationDetailsChange(index, e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    ))}
                    <div className="sr-submit">
                        <button type="submit" className="update-hrs-button" onClick={handleSubmit}>
                            Update Hours
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    ) : (
        <div>Not logged in</div>
    );
};

export default TrainerHomePage;
