import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const SortableTable = () => {
  const [myArray, setMyArray] = useState([
    { name: 'Michael', age: '30', birthdate: '11/10/1989' },
    { name: 'Mila', age: '32', birthdate: '10/1/1989' },
    { name: 'Paul', age: '29', birthdate: '10/14/1990' },
    { name: 'Dennis', age: '25', birthdate: '11/29/1993' },
    { name: 'Tim', age: '27', birthdate: '3/12/1991' },
    { name: 'Erik', age: '24', birthdate: '10/31/1995' }
  ]);
  const [order, setOrder] = useState({ name: 'desc', age: 'desc', birthdate: 'desc' });

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
    <table class="table table-striped">
      <thead>
        <tr class="bg-info">
          <th onClick={() => handleSort('name')}>
            Name {order.name === 'desc' ? '▲' : '▼'}
          </th>
          <th onClick={() => handleSort('age')}>
            Age {order.age === 'desc' ? '▲' : '▼'}
          </th>
          <th onClick={() => handleSort('birthdate')}>
            Birthday {order.birthdate === 'desc' ? '▲' : '▼'}
          </th>
        </tr>
      </thead>
      <tbody id="myTable">
        {myArray.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.birthdate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;