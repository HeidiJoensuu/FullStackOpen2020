import React from "react";

const Part: React.FC<{ CoursePart: CoursePart }> = ({CoursePart}) => {
  switch (CoursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>{CoursePart.name} {CoursePart.exerciseCount} {CoursePart.description} </p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>{CoursePart.name} {CoursePart.exerciseCount} {CoursePart.groupProjectCount} </p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p> {CoursePart.name} {CoursePart.exerciseCount} {CoursePart.description} {CoursePart.exerciseSubmissionLink} </p>
        </div>
      );
    case "Little features":
      return (
        <div>
          <p> {CoursePart.name} {CoursePart.exerciseCount} {CoursePart.description} </p>
        </div>
      )
    default:
        return (
          <div>
            <p>Something went wrong</p>
          </div>
        )
  }
};

export default Part;