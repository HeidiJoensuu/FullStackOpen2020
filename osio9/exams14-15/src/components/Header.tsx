// The Header component should take care of rendering the name of the course.
/*
const Header = ({course}) => <h1>{course}</h1>
*/
import React from "react";

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

export default Header;