import { useState, useEffect } from "react";

const useFetch = () => {
  const [trainer_data, setTrainerData] = useState([]);
  const [workshop_data, setWorkshopData] = useState([]);
  const [today_data, setTodayData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/graph/getTrainerGraph", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrainerData(data.data);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:5001/graph/getGraphWorkshopSummary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkshopData(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:5001/graph/getTodayGraph", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data3) => {
        setTodayData(data3.data);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return { trainer_data, workshop_data, today_data };
};

export default useFetch;
