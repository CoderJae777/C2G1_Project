import React from 'react';
import { Rectangle } from 'recharts';

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      {...props}
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="#000" // Border color
      strokeWidth={2} // Border thickness
    />
  );
};

export default CustomBar;
