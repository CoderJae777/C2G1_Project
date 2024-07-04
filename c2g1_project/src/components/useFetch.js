import { useEffect, useState } from "react";

const useFetch = () => {
  const [trainer_data, setTrainerData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/trainer_data/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTrainerData(data);
      });
  });
  return { trainer_data };
};

export default useFetch;
