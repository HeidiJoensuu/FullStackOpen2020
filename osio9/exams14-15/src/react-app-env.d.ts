/// <reference types="react-scripts" />

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseDescriptionBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseDescriptionBase {
  name: "Little features";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
