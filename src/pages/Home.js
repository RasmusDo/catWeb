import { useState, useEffect, useCallback } from 'react';
import Particles, { ISourceOptions, Main } from 'react-tsparticles';
import { loadSeaAnemonePreset } from 'tsparticles-preset-sea-anemone';
import './Home.css';

export default function Home() {
  function particlesInit(tsParticles) {
    console.log('init', tsParticles);

    loadSeaAnemonePreset(tsParticles);
  }

  const [cat, setCat] = useState([]);
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    quotes();
    cats();
  }, []);

  const cats = async () => {
    const response = await fetch('https://cataas.com/cat');

    setCat(await response.json());
  };

  const quotes = async () => {
    const response = await fetch('https://cat-fact.herokuapp.com/facts');

    setQuote(await response.json());
  };

  return (
    <div className="main">
      <Particles
        id="particleContainer"
        options={{
          fullScreen: { enable: false },
          preset: 'seaAnemone',
          container: '',
        }}
        init={particlesInit}
      />
      <h1>Here is the quote of the day!</h1>
      <img
        src="https://cataas.com/cat?width=500&height=500"
        alt="randomcat"
      ></img>
      <ul className="quouteList">
        {quote.map((data) => {
          return <li key={data.user}>{data.text}</li>;
        })}
      </ul>
    </div>
  );
}
