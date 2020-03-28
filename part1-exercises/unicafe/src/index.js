import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  //state variables for the voting, statistics depend on them
  //only call useState() inside of the body of Components, don't call in loops, conditional expressions,
  //or any place that is not a function defining a component!
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [nVotes, setTotal] = useState(0);
  
  let average, positive;

  //handleClick functions
  const voteGood = () => {
    setGood(good + 1);
    setTotal(nVotes + 1);
  }
  const voteNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(nVotes + 1);
  }
  const voteBad = () => {
    setBad(bad + 1);
    setTotal(nVotes + 1);
  }

  //start calculating if nVotes > 0 to avoid dividing by zero and displaying 'Undefined' on the page
  if (nVotes > 0) {
    average = (good - bad) / (nVotes); //neutral is score 0
    positive = (good / nVotes);

    return (
      <div>
        <h1>Your feedback</h1>
        <Button handleClick={voteGood} text='It was good' />
        <Button handleClick={voteNeutral} text='It was okay' />
        <Button handleClick={voteBad} text='It was bad' />
        <h1>Statistics</h1>
        <table>
          <tbody>
          <Statistics text='Good: ' value={good} />
          <Statistics text='Neutral: ' value={neutral} />
          <Statistics text='Bad: ' value={bad} />
          <Statistics text='Total votes: ' value={nVotes} />
          <Statistics text='Average: ' value={average} />
          <Statistics text='Positive: ' value={positive} />
          </tbody>
        </table>
      </div>
    )
  }

  else { //if no votes render text saying no feedback
    return (
      <div>
        <h1>Your feedback</h1>
        <Button handleClick={voteGood} text='It was good' />
        <Button handleClick={voteNeutral} text='It was okay' />
        <Button handleClick={voteBad} text='It was bad' />
        <h1>Statistics</h1>
        <p>No feedback yet.</p>
      </div>
    )
  }


}

const Statistics = (props) => {

  let { value, text } = props;
  let value2 = '';
  if (text === 'Positive: ') {
    value = value*100;
    value2 = ' %';
  } 

  return ( //if there are votes we render the statistics
    <>
      <tr>
        <th><p>{text}</p></th>
        <td>{value}{value2}</td>
      </tr>
    </>
  )
}//fim Statistics


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

