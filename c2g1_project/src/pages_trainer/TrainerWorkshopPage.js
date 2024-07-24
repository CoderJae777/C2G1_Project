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
import ColourCalendar from "../components/ColourCalendar.js";
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
    const allocatedWorkshops = useAxiosGet(
        config.base_url + endpoints.trainer.getAllocatedWorkshopRequests
      );

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    const [sortKey, setSortKey] = useState('workshop_name');
    const [filterText, setFilterText] = useState('');
    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredAndSortedWorkshops = allocatedWorkshops.data.trainer_workshops ? allocatedWorkshops.data.trainer_workshops
    .filter(workshop => 
      workshop.workshop_data.workshop_name.toLowerCase().includes(filterText.toLowerCase()) ||
        workshop.company.toLowerCase().includes(filterText.toLowerCase()) ||
        convertDate(workshop.start_date).toLowerCase().includes(filterText.toLowerCase()) ||
        convertDate(workshop.end_date).toLowerCase().includes(filterText.toLowerCase())
        // || workshop.trainer.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    }) : [];

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

    const handleCalendarSelect = (date) => {
        if (date === filterText) {
            setFilterText("");
        }
        else {
            setFilterText(date);
        }
    }

    


    // CALLING DATA FROM JSON
    const { trainer_data, workshop_data, today_data } = useFetch();

    const { data, loading, error, setBody, refetch } = useAxiosGet(
        config.base_url + endpoints.verify
    );

    return data !== null && data.role === "trainer" ?  (
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
                <div className="workshop-calendar">
                    {" "}
                    <div className="workshop-table-title">
                        <h4>Workshop Dates</h4>
                    </div>
                    {today_data && today_data[0] ? (
                        <>
                            <ColourCalendar  workshopdata = {filteredAndSortedWorkshops} ondateClick={handleCalendarSelect}/>
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
                        <div className="filter">
                            <span>Filter:</span>
                            <input
                                type="text"
                                placeholder="Type to filter"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                            <span>Sort:</span>
                            <select value={sortKey} onChange={handleSortChange}>
                                <option value="workshop_name">Workshop Name</option>
                                <option value="client_company">Client Company</option>
                                <option value="start_date">Start Date</option>
                                <option value="trainer">Assigned Trainer</option>
                            </select>
                        </div>                        
                        <div className ="scrollable_list">
                            <ul>
                                {allocatedWorkshops.data.trainer_workshops && filteredAndSortedWorkshops.map((workshop, index) => (   
                                    <div>   
                                        <button className="workshop_detail_panel" key={workshop.id} onClick={() => handleOpenWorkshopAndClientDetails(workshop)}> 
                                            <span>Workshop Name: {workshop.workshop_data.workshop_name}</span>
                                            <span>Client: {workshop.company}</span>
                                            {/*<span>Assigned Trainer: {workshop.trainers}</span>*/}
                                            <span>Start Date: {convertDate(workshop.start_date)}</span>
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    ): (
        <div>Not logged in</div>
      );
};

export default TrainerWorkshopPage;
