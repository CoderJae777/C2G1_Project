import React from "react";
import useFetch from "../components/useFetch.js";
import useAxiosGet from "../api/useAxiosGet.jsx";
import "../styles/trainerhomepage.css";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import TopLeftSideBar from "../components/TrainerTopLeftSideBar.js";
import WorkshopAndClientDetails from "../components/WorkshopAndClientDetails.js";
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



const TrainerWorkshopPage = () => {
    const workshop_data_temp = [
        {
            id: "005379",
            workshop_name: "Intro to Excel",
            workshop_type: "Infrastructure and demo",
            client_company: "DancingLion",
            client_type: "Executive",
            duration: "3 days",
            start_date: "31/02/2025",
            deal_size: "$3500",
            location: "Singapore",
            venue: "Istana",
            attendees: "17",
            comments: "Count to fifty in the blink of an eye.",
            trainer: "Joe"
        },
        {
            id: "002513",
            workshop_name: "Biased Cognition",
            workshop_type: "Business value discovery",
            client_company: "WindsOfUranus",
            client_type: "Technical",
            duration: "4 days",
            start_date: "18/05/2025",
            deal_size: "$47000",
            location: "Singapore",
            venue: "East Coast Park",
            attendees: "13",
            comments: "Don't use the saw, he got the wrong thing.",
            trainer: "Joe"
        },
        {
            id: "001478",
            workshop_name: "Intro to Computers",
            workshop_type: "Business value discovery",
            client_company: "UngaBunga",
            client_type: "Technical",
            duration: "4 days",
            start_date: "18/05/2025",
            deal_size: "$47000",
            location: "Singapore",
            venue: "East Coast Park",
            attendees: "4",
            comments: "Inside my mind, there is a digital mind.",
            trainer: "James"
        },
        {
            id: "006085",
            workshop_name: "Creative AI",
            workshop_type: "AI platform",
            client_company: "DramaticExit",
            client_type: "Technical",
            duration: "2 days",
            start_date: "22/11/2025",
            deal_size: "$678000",
            location: "Singapore",
            venue: "SUTD",
            attendees: "60",
            comments: "This table is not very good for glamping. HI HIH HI HIH HI HIH I HI HI HI HI HI HI HI H IHI HI H IH IH IH IH IH IH IH IH IH IH IH IH IH IH I HI HI HI H HI H.",
            trainer: "James"
        }
    ];

    const [sortKey, setSortKey] = useState('workshop_name');
    const [filterText, setFilterText] = useState('');
    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredAndSortedWorkshops = workshop_data_temp
    .filter(workshop => 
      workshop.workshop_name.toLowerCase().includes(filterText.toLowerCase()) ||
        workshop.client_company.toLowerCase().includes(filterText.toLowerCase()) ||
        workshop.trainer.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });

    const [trainergraphsTitle, setTrainerGraphsTitle] = useState(
        "View Trainer statistics"
    );
    const [workshopgraphsTitle, setWorkshopGraphsTitle] = useState(
        "Workshops"
    );

    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    const [key, setKey] = useState("workshops_completed_total");
    const [key_ws, setKeyWS] = useState("completed");

    const [domainMax, setDomainMax] = useState(0);
    const [isWorkshopAndClientDetailsOpen, setIsWorkshopAndClientDetailsOpen] =
        useState(false);

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

    const handleOpenWorkshopAndClientDetails = (workshop) => {
        setSelectedWorkshop(workshop);
        setIsWorkshopAndClientDetailsOpen(true);
    };

    const handleCloseWorkshopAndClientDetails = () => {
        setIsWorkshopAndClientDetailsOpen(false);
    };

    // CALLING DATA FROM JSON
    const { trainer_data, workshop_data, today_data } = useFetch();

    const { data, loading, error, setBody, refetch } = useAxiosGet(
        config.base_url + endpoints.verify
    );

    return  (
        <motion.div
            className="admin-home-page"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isWorkshopAndClientDetailsOpen && selectedWorkshop && (
                <WorkshopAndClientDetails onClose={handleCloseWorkshopAndClientDetails} workshop={selectedWorkshop} />
            )}
            
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
                                <h2 className="today_data">
                                    {today_data[0].ongoingworkshopstoday}
                                </h2>
                                <h5>Ongoing workshops today</h5>
                            </div>
                            <div className="trainersworking">
                                <h2 className="today_data">{today_data[0].trainertoday}</h2>
                                <h5>Trainers conducting across all workshops</h5>
                            </div>
                            <div className="workshopattendees">
                                <h2 className="today_data">
                                    {today_data[0].participantstoday}
                                </h2>
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
                    <div className="breakdown-of-attendance-title">
                        <h5>Breakdown of Attendance in 2024</h5>
                    </div>
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
                        <h5 className="workshop-stats-title">{workshopgraphsTitle}</h5>
                        <div>
                            Filter:
                            <input
                                type="text"
                                placeholder="Type to filter"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                            Sort:
                            <select value={sortKey} onChange={handleSortChange}>
                                <option value="workshop_name">Workshop Name</option>
                                <option value="client_company">Client Company</option>
                                <option value="start_date">Start Date</option>
                                <option value="trainer">Assigned Trainer</option>
                            </select>
                        </div>
                        
                        <div className ="scrollable_list">
                            <ul>
                                {filteredAndSortedWorkshops.map((workshop, index) => (   
                                    <div>
                                        <button className="workshop_detail_panel" key={workshop.id} onClick={() => handleOpenWorkshopAndClientDetails(workshop)}> 
                                            <span>Workshop Name: {workshop.workshop_name}</span>
                                            <span>Client: {workshop.client_company}</span>
                                            <span>Assigned Trainer: {workshop.trainer}</span>
                                            <span>Start Date: {workshop.start_date}</span>
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default TrainerWorkshopPage;
