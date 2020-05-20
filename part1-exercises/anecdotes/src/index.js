import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0); //keeps index of currently selected anectode
  const [score, setScore] = useState([0, 0, 0, 0, 0, 0]); //array containing number of votes received for each anectode
  const [nVotes, setTotal] = useState(0); //total number of votes cast so far

  const rollTheDice = () => {
    let previousAnecdoteIndex = selected;
    let newAnectodeIndex = previousAnecdoteIndex;
    while (previousAnecdoteIndex === newAnectodeIndex) {
      //keep rolling dice till you get something different
      newAnectodeIndex = Math.floor(Math.random() * anecdotes.length); // the math expression will return an integer between 0 and 5 for length == 6, according to w3schools :)
    }
    setSelected(newAnectodeIndex); //length = 6
  };

  const castVote = () => {
    const newScore = [...score]; //make a copy of score
    newScore[selected] += 1; //updates score
    setScore(newScore); //updates score state
    setTotal(nVotes + 1);
  };

  //function that returns the index of the most voted anecdote
  const findMax = (arr) => {
    let currentMax = arr[0];
    let maxIndex = 0;
    let i, candidate, len;

    for (i = 1, len = arr.length; i < len; i++) {
      candidate = arr[i];
      if (candidate > currentMax) {
        currentMax = candidate;
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  let mostVoted;
  if (nVotes > 0) mostVoted = findMax(score);

  return (
    <div>
      <p>
        Anecdote: <b>{props.anecdotes[selected]}</b>
      </p>
      <br />
      <p>
        The anecdote above currently has <b>{score[selected]} votes</b>. If it's
        in your heart to go in that direction, you can cast a vote for it below!
        Roll the dice to check for others. You can vote for as many as you want.
      </p>
      <Button
        handleClick={rollTheDice}
        text="Roll the dice for another anecdote!"
      />
      <Button
        handleClick={castVote}
        text="Cast a vote for this funny anectode."
      />
      <MostVotes nVotes={nVotes} score={score} mostVoted={mostVoted} />
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const MostVotes = (props) => {
  let nVotes = props.nVotes;
  let score = props.score;
  let mostVoted = props.mostVoted;

  if (nVotes === 0)
    return (
      <>
        <br />
        <br />
        <h2>Anecdote with most votes:</h2>
        <p>No votes yet.</p>
      </>
    );
  else
    return (
      <>
        <h1>Anecdote with most votes:</h1>
        <p>{anecdotes[mostVoted]}</p>
        <p>
          <i>
            It received {score[mostVoted]} votes out of {nVotes}.
          </i>
        </p>
      </>
    );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
