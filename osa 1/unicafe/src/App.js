import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="all" value={props.all} />
          <StatisticsLine text="average" value={props.average} />
          <StatisticsLine text="positive" value={`${props.positive}%`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /*
  const handleGoodClicks = () => {
    setGood(good + 1);
  };

  const handleBadClicks = () => {
    setBad(bad + 1);
  };

  const handleNeutralClicks = () => {
    setNeutral(neutral + 1);
  };
*/
  const allFeedBacks = good + bad + neutral;

  const positive = good / allFeedBacks;

  const average = (good - bad) / allFeedBacks;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={allFeedBacks}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
