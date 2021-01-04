import './index.css';
import styled from "styled-components";
import React, { useState} from 'react';

const api = {
  key: "b2381a808285feec8e3bcd51978ce93c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
          });
    }
  }

  const currentDate = new Date().toDateString();

  return (
    <div className={(typeof weather.main != "undefined" ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App' )}>
      <main>
        <StyledSearch>
          <StyledSearchInput 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </StyledSearch>
        {(typeof weather.main != "undefined") ? (
          <span>
            <StyledLocationBox>
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="currentDate">
                    {currentDate}
                  </div>
            </StyledLocationBox>

            <StyledWeatherBox>
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </StyledWeatherBox>
          </span>
        ) : 'test' }
      </main>
    </div>
  );
}

const StyledWeatherBox = styled.div`
  text-align:center;

  & .temp {
    position:relative;
    display:inline-block;
    margin:30px auto;
    background-color:rgba(255,255,255,0.2);
    border-radius:16px;
    padding:15px 25px;
    color:#fff;
    font-size:102px;
    font-weight:900;
    text-shadow:3px 6px rgba(50,50,70,0.5);
    box-shadow:3px 6px rgba(0,0,0,0.2);
  }

  & .weather {
    color:#fff;
    font-size:48px;
    font-weight:large;
    text-shadow:3px 3px rgba(50,50,70,0.5);
  }
`

const StyledLocationBox = styled.div`
  & .location {
    color:#fff;
    font-size:32px;
    font-weight:500;
    text-align:center;
    text-shadow:3px 3px rgba(50,50,70,0.5);
  }
  & .currentDate {
    color:#fff;
    font-size:20px;
    font-weight:300;
    font-style:italic;
    text-align:center;
    text-shadow: 2px 2px rgba(50,50,70,0.5);
  }
`

const StyledSearch = styled.div`
  width:100%;
  margin: 0 auto;
`
const StyledSearchInput = styled.input`
  display:block;
  width:100%;
  padding:15px;
  appearance:none;
  background:none;
  border:none;
  outline:none;
  background-color:rgba(255,255,255,0.5);
  border-radius:0px 0px 16px 16px;
  box-shadow:0px 5px rgba(0,0,0,0.1);
  color:#2b2b2b;
  font-size:20px;
  transition:0.4s ease;

  &:focus {
    background-color:rgba(255,255,255,0.75);
  }
`

export default App;
