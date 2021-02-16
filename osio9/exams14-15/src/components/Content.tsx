import React from "react";
import Part from "./Part";

const Content: React.FC<{ CoursePart: CoursePart[] }> = ({CoursePart}) => (
  <div>
    {CoursePart.map( CoursePart => < Part CoursePart={CoursePart} /> )}
  </div>
);

export default Content;