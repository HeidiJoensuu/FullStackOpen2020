interface Inputs {
  height: number,
  weight: number
}

const calculateBmi = (height: number, weight: number) : string => {
  const bmi = (weight / ((height*0.01)**2));

  if (bmi < 15) {
    return 'Very severely underweight';
  } else if ( bmi <= 15|| bmi < 16){
    return 'Severely underweight';
  } else if ( bmi <= 16|| bmi < 18.5){
    return 'Underweight';
  } else if ( bmi <= 18.5|| bmi < 25){
    return 'Normal (healthy weight)';
  } else if ( bmi <= 25|| bmi < 30){
    return 'Overweight';
  } else if ( bmi <= 30 || bmi < 35){
    return 'Obese Class I (Moderately obese)';
  } else if ( bmi <= 35|| bmi < 40){
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }  
};

const parseInput = (args: Array<string>): Inputs => {
  if (args.length < 4) throw new Error('Arguments missing');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseQueryBmi = (queryHeight: string, queryWeight: string) : string => {
  if (!isNaN(Number(queryHeight)) && !isNaN(Number(queryWeight))) {
    return calculateBmi(Number(queryHeight), Number(queryWeight));
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {height, weight} = parseInput(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
  console.log(error.message);
  } else {
    throw error;
  }
}