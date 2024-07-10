import { useState, useEffect } from "react";

const useFetch = () => {
  const [trainer_data, setTrainerData] = useState([]);
  const [workshop_data, setWorkshopData] = useState([]);
  const [today_data, setTodayData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/products/trainerGraph", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrainerData(data.data);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:5001/products/workshopGraph", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.data);
        setWorkshopData(data.data);
      })
      .catch((error) => console.error("Error:", error));

    // .then((data2) => {
    //   console.log("here", data2);
    //   setWorkshopData(data2);
    // });
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:5001/products/todayGraph", {
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
