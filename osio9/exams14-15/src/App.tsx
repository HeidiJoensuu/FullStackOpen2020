import React from "react";
import Total from './components/Total'
import Header from './components/Header'
import Content from './components/Content'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Little features",
      exerciseCount: 2,
      description: "Tiny tany course"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content CoursePart={courseParts} />
      <Total CoursePart={courseParts} />
    </div>
  )
};

export default App;