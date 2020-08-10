import * as _ from "lodash";

interface Values {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1|2|3,
  ratingDescription: string
  target: number,
  average: number
}

interface Inputs {
  list: Array<number>,
  initTarget: number
}

const calculate = (list: Array<number>, initTarget: number): Values => {
  let daysOfTraining = 0;

  list.forEach(element => {
    if (element > 0) {
      daysOfTraining = daysOfTraining +1;
    }
  });
  const averagecount = (_.sum(list)/list.length);
  
  const ratingCount = () => {
    if (averagecount < 1.5) return 1;
    else if (1.5 <= averagecount || averagecount < 2) return 2;
    else return 3;
  };

  const description = () => {
    if (ratingCount() === 1 ) return 'Not enought';
    if (ratingCount() === 2 ) return 'Not too bad but could be better';
    if (ratingCount() === 3) return 'Good job!';
    else return 'Something went wrong in counting';
  };

  return {
    periodLength: list.length,
    trainingDays: daysOfTraining,
    success: averagecount > initTarget,
    rating: ratingCount(),
    ratingDescription: description(),
    target: initTarget,
    average: averagecount
  };
};

const parseInput = (args: Array<string>): Inputs => {
  if (args.length < 4) throw new Error('Arguments missing');

  let savedTarget = 0;
  const savedList: number[] = [];
  if (!isNaN(Number(args[2]))) {
      savedTarget= Number(args[2]);
  } else {
    throw new Error('target is not a number');
  }
  const searchList = _.drop(args,3);
  
  searchList.forEach(element => {
    if (Number(element) || element === '0'){
      savedList.push(Number(element));
    } else {
      throw new Error(`${element} is not a number`);
    }
  });

  return {
    list: savedList,
    initTarget: savedTarget
  };
};

try {
  const {list, initTarget} = parseInput(process.argv);
  console.log(calculate(list, initTarget));
} catch (error) {
  if (error instanceof Error) {
  console.log(error.message);
  } else {
    throw error;
  }
}
