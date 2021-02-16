import React from "react";

const reducer = (accumulator: number, currentValue: CoursePart): number => accumulator + currentValue.exerciseCount

const Total: React.FC<{ CoursePart: CoursePart[] }> = ({ CoursePart }) => (

  <div>
    Number of exercises: 
    {CoursePart.reduce<number>(reducer, 0)}
  </div>
);

export default Total;