//import React from 'react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

  /*
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  return (
    <div>{counter}</div>
  )
}
*/
/*
  let counter = 1
  const refresh = () => {
    ReactDOM.render(<App counter={counter} />, 
    document.getElementById('root'))
  } 

  refresh()
  counter += 1
  refresh()
  counter += 1
  refresh()

  setInterval(() => {
    refresh()
    counter += 1
  }, 1000)

  */
/************************************************************ */
/*
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
//const Display = ({ counter }) => <div>{counter}</div>

/*
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)


  return (
    <div>
      <Display counter={counter}/>
      <Button 
        handleClick={increaseByOne}
        text = 'plus' 
        />
      <Button 
        handleClick={setToZero}
        text = 'zero' 
        />
      <Button 
        handleClick={decreaseByOne}
        text = 'minus' 
        />
    </div>
  )
}
/************************************************************ */


const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    
    //setClicks({ ...clicks, left: clicks.left + 1 })
    /* ylempi
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
    */
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    
    //setClicks({ ...clicks, right: clicks.right + 1 })
    /* ylempi
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
    */
  }

  const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
  
  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App counter={App} />, 
  document.getElementById('root')
)
