import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/adminhomepage.css";
import { useState } from 'react';
import useFetch from './components/useFetch';

const TrainerTable = () => {
  const [myArray, setMyArray] = useState([
    { name: 'Michael', role: 'Training Lead', workshop: 'Intro to Design' },
    { name: 'Mila', role: 'Training Assistant', workshop: 'Intro to AI' },
    { name: 'Paul', role: 'Training Assistant', workshop: 'Interview Hacks!' },
    { name: 'Dennis', role: 'Training Assistant', workshop: 'Cancelled' },
    { name: 'Tim', role: 'Training Lead', workshop: 'Intro to AI' },
    { name: 'Erik', role: 'Training Assistant', workshop: 'Resume Review' }
  ]);
  const { trainer_data } = useFetch();

  const [order, setOrder] = useState({ name: 'desc', role: 'desc', workshop: 'desc' });

  const handleSort = (column) => {
    const newOrder = order[column] === 'desc' ? 'asc' : 'desc';
    const sortedArray = [...myArray].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setMyArray(sortedArray);
    setOrder({ ...order, [column]: newOrder });
  };

  return (
    <table class="table-striped">
      <thead>
        <tr class="bg-info">
          <th onClick={() => handleSort('name')}>
            Name {order.name === 'desc' ? '▲' : '▼'}
          </th>
          <th onClick={() => handleSort('role')}>
            Role {order.role === 'desc' ? '▲' : '▼'}
          </th>
          <th onClick={() => handleSort('workshop')}>
            Workshop {order.workshop === 'desc' ? '▲' : '▼'}
          </th>
        </tr>
      </thead>
      <tbody id="myTable">
        {myArray.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.role}</td>
            <td>{item.workshop}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainerTable;