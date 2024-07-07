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

  const [workshop_data, setWorkshopData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8002/workshop_data/")
      .then((res) => {
        return res.json();
      })
      .then((data2) => {
        setWorkshopData(data2);
      });
  });

  const [today_data, setTodayData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8003/today_data/")
      .then((res) => {
        return res.json();
      })
      .then((data3) => {
        setTodayData(data3);
      });
  });
  return { trainer_data, workshop_data, today_data };
};

export default useFetch;


//////////////////////
// useState()
//////////////////////
// handle any data that changes 
// 0 is initial state
// const [count, setCount] = useState(0)


//////////////////////
// useEffect()
//////////////////////
// they will run once when first intialised
// it will keep running 
// add dependency as such : 
// useEffect(()=> {
//   alert('hi')
// }, [count]
// ) ==> 



//////////////////////
// useRef()
//////////////////////
// value changes but does not trigger re-render
// useful for grabbing html


//////////////////////
// useReducer(reducer, 0)
//////////////////////
// alternative to useState()
// const [state, dispatch] = useReducer(reducer, initialState);
// everytime there is changes, runs a function based on changes
