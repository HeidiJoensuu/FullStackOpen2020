import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Header = ({header}) => <h1>{header}</h1>

const Feedback = ({feedback}) => <h3>{feedback}</h3>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const History = ({good, neutral, bad}) => {
  //console.log(good, neutral, bad)
  if ( good || neutral || bad ) {
    return (
      <div>
      <br />
      <table>
        <tbody>
          <StatisticLine text="Hyvä" value ={good} />
          <StatisticLine text="Neutraali" value ={neutral} />
          <StatisticLine text="Huono" value ={bad} />
          <StatisticLine text="Palautteita yhteensä" value ={good+neutral+bad} />
        </tbody>
      </table>
      </div>
    )
  }
  return (
    <div>
      <br />Ei palautetta annettu
    </div>
  )
}

const Static = ({good, neutral, bad}) => {
  if ( good || neutral || bad ) {
    const yht = good+neutral+bad
    
    const keskiarvo = ((good-bad) / yht).toFixed(3)
    const positiivisia = (good / yht *100).toFixed(3)

    return (
      <div>
      <br />
      <table>
        <tbody>
          <StatisticLine text="Keskiarvo" value ={keskiarvo} />
          <StatisticLine text="joista positiivisia" value ={positiivisia} />
        </tbody>
      </table>
      </div>
    )
  }
  return " "
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr> 
  )
}

/*******************************/

const App = () => {
  const header = 'Anna palautetta'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'Annettu palaute'
  
  return (
    <div>
      <Header header={header} />
      <Button handleClick={() => setGood(good+1)} text='Hyvä' />
      <Button handleClick={() => setNeutral(neutral+1)} text='Neutraali' />
      <Button handleClick={() => setBad(bad+1)} text='Huono' />
      <Feedback feedback={feedback} />
      <History good={good} neutral={neutral} bad={bad} />
      <Static good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))