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

  const {
    data: trainerdata,
    loading: trainerloading,
    error: trainererror,
    seturl: trainerseturl,
    setParams: trainersetParams,
    refetch: trainerrefetch,
  } = useAxiosGet(config.base_url + endpoints.trainer.getOthers, {}, [], true);

    const {
        data: workshopdata,
        loading: workshoploading,
        error: workshoperror,
        seturl: workshopseturl,
        setParams: workshopsetParams,
        refetch: workshoprefetch
      } = useAxiosGet(
        config.base_url + endpoints.trainer.getApprovedWorkshops,
        {},
        [],
        true  
      );
      console.log("HERE", trainerdata)
    const nonAllocatedWorkshops = allocatedWorkshops.data.trainer_workshops && workshopdata && workshopdata.length > 0 ? workshopdata[0].filter(workshop =>
        !allocatedWorkshops.data.trainer_workshops.some(allocatedworkshop => allocatedworkshop._id === workshop._id)) : [];
    
    

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getTrainersOfWorkshop = (workshop) => {
    if (!workshop) return [];
    // console.log("getTrainersOfWorkshop")
    // console.log(workshop)
    const trainerNames = workshop.trainers
      .map((trainerId) => {
        const trainer = trainerdata.find(
          (trainer) => trainer._id === trainerId
        );
        return trainer ? trainer.fullname : null;
      })
      .filter((name) => name); // Filter out any null/undefined values

    if (trainerNames.length === 0) return "None";

    return trainerNames.join(", ").concat(",");
  };

  // console.log(trainerdata)

  const [sortKey, setSortKey] = useState("workshop_name");
  const [filterText, setFilterText] = useState("");
  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

    // console.log("nonAllocatedWorkshops")
    // console.log(nonAllocatedWorkshops)

    // console.log("Allocated workshops")
    // console.log(allocatedWorkshops.data.trainer_workshops)

    const completeworkshops = allocatedWorkshops.data.trainer_workshops ? nonAllocatedWorkshops.concat(allocatedWorkshops.data.trainer_workshops) : [];
    // console.log("completeworkshops")
    // console.log(completeworkshops)

    const filteredAndSortedWorkshops = completeworkshops ? completeworkshops
    .filter(workshop => {
      // console.log("test")
      //   console.log(workshop);
        let trainerNames = getTrainersOfWorkshop(workshop).toLowerCase();
        let request_id = workshop.request_id ? workshop.request_id.toLowerCase() : ""
        let workshopName = typeof workshop.workshop_data === 'string' ? "" : workshop.workshop_data.workshop_name.toLowerCase();
        
        return (
            workshopName.includes(filterText.toLowerCase()) ||
            workshop.company.toLowerCase().includes(filterText.toLowerCase()) ||
            convertDate(workshop.start_date).toLowerCase().includes(filterText.toLowerCase()) ||
            convertDate(workshop.end_date).toLowerCase().includes(filterText.toLowerCase()) ||
            (new Date(workshop.start_date) <= new Date(filterText) && new Date(workshop.end_date) >= new Date(filterText)) || // filter includes in-between dates
            trainerNames.includes(filterText.toLowerCase()) ||
            request_id.includes(filterText.toLowerCase())
        );
    })
    .sort((a, b) => {
        if (sortKey == "trainer"){
            if (getTrainersOfWorkshop(a).toLowerCase() <getTrainersOfWorkshop(b).toLowerCase()) return -1;
            if (getTrainersOfWorkshop(a).toLowerCase() >getTrainersOfWorkshop(b).toLowerCase()) return 1;
        }
        if (sortKey == "request_id"){
            if (a[sortKey] > b[sortKey]) return -1;
            if (a[sortKey] < b[sortKey]) return 1;
        }
        if (a[sortKey] < b[sortKey]) return -1;
        if (a[sortKey] > b[sortKey]) return 1;
        return 0;
    }) : [];

  // console.log("filtered and sorted");
  // console.log(filteredAndSortedWorkshops);

  const [trainergraphsTitle, setTrainerGraphsTitle] = useState(
    "View Trainer statistics"
  );
  const [workshopgraphsTitle, setWorkshopGraphsTitle] = useState("Workshops");

  const [selectedWorkshops, setSelectedWorkshops] = useState([]);

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
    if (allocatedWorkshops.data.trainer_workshops.includes(workshop)) {
      setSelectedWorkshops(workshop);
      setIsWorkshopAndClientDetailsOpen(true);
    }
  };

  const handleCloseWorkshopAndClientDetails = () => {
    setIsWorkshopAndClientDetailsOpen(false);
  };

  const handleCalendarSelect = (date) => {
    if (date === filterText) {
      setFilterText("");
    } else {
      setFilterText(date);
    }
  };

  const isunAllocatedWorkshop = (workshop) => {
    return allocatedWorkshops.data.trainer_workshops.includes(workshop)
      ? ""
      : "unallocated-workshop";
  };

  // CALLING DATA FROM JSON
  const { trainer_data, workshop_data, today_data } = useFetch();

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

    return data !== null && data.role === "trainer" ?  (
        <motion.div
            className="trainer-home-page"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isWorkshopAndClientDetailsOpen && selectedWorkshops && (
                <WorkshopAndClientDetails onClose={handleCloseWorkshopAndClientDetails} workshop={selectedWorkshops} />
            )}
            
            <div className="top-panel">
                <TopLeftSideBar />
            </div>
            <div className="left-column">
                <div className="trainer-home-page-title"></div>

        {/* Workshop summary starts here */}
        <div className="workshop-calendar">
          {" "}
          <div className="workshop-table-title">
            <h4>Workshop Dates</h4>
          </div>
          {today_data && today_data[0] ? (
            <>
              <ColourCalendar
                workshopdata={filteredAndSortedWorkshops}
                ondateClick={handleCalendarSelect}
                trainerdata={trainerdata}
              />
            </>
          ) : (
            <div>Calculating all data... This may take awhile...</div>
          )}
        </div>
        {/* Workshop summary ends here */}
      </div>

            {/* Graphs nonsense starts here */}
            <div className="right-column">
                <div className="admin-graphs">
                    
                    {/* Right column MAIN DIV NUMBER 1 */}
                    <div className="workshop-stats">
                        <h4 className="workshop-stats-title">{workshopgraphsTitle}</h4>
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
                                <option value="request_id">Request ID</option>
                                <option value="start_date">Start Date</option>
                                <option value="trainer">Assigned Trainer</option>
                            </select>
                        </div>                        
                        <ul className ="scrollable_list">
                                {allocatedWorkshops.data.trainer_workshops && filteredAndSortedWorkshops.map((workshop, index) => (   
                                    <div>   
                                        <button className={`workshop_detail_panel ${isunAllocatedWorkshop(workshop)}`}  key={workshop.id} onClick={() => handleOpenWorkshopAndClientDetails(workshop)}> 
                                            <span>Assigned Trainers: {getTrainersOfWorkshop(workshop)}</span>
                                            <span>Start Date: {convertDate(workshop.start_date)}</span>
                                            <span>End Date: {convertDate(workshop.end_date)}</span>
                                            <span>Request ID: {workshop.request_id}</span>
                                            <span className="allocated-only">Client: {workshop.company}</span>
                                            <span className="allocated-only">Workshop Name: {workshop.workshop_data.workshop_name}</span>
                                        </button>
                                    </div>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    ): (
        <div>Not logged in</div>
      );
};

export default TrainerWorkshopPage;
