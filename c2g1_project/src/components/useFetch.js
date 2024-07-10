import { useState, useEffect } from "react";

const useFetch = () => {
  const [trainer_data, setTrainerData] = useState([]);
  const [workshop_data, setWorkshopData] = useState([]);
  const [today_data, setTodayData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/trainer_data/")
      .then((res) => res.json())
      .then((data) => {
        setTrainerData(data);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:8002/workshop_data/")
      .then((res) => res.json())
      .then((data2) => {
        setWorkshopData(data2);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    fetch("http://localhost:8003/today_data/")
      .then((res) => res.json())
      .then((data3) => {
        setTodayData(data3);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return { trainer_data, workshop_data, today_data };
};

export default useFetch;
