import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiWindBold } from "react-icons/pi";
import { BiWater } from "react-icons/bi";
import cloud from "./assets/cloud.png"
import clear from "./assets/clear.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import notfound from "./assets/notfound.png"
function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true)
  const [titleCity, setTitleCity] = useState('India');
  const [apiCity, setApiCity] = useState(titleCity);
  var imgSrc;



  const fetchData = async () => {

    try {
      setLoading(true);
      const key=process.env.REACT_APP_WEATHER_API_KEY;
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + apiCity + "&appid="+key;
      const output = await fetch(url);
      const data = await output.json();
      console.log(url);
      console.log(data);
      setWeatherData(data);
      setLoading(false);
    }
    catch (e) {
      console.log("hello" + e);

    }
  }


  useEffect(() => {
    fetchData();

  }, [apiCity])

  return (


    <div className={` background w-screen h-screen flex items-center justify-center`}>

      <div className='  w-[400px] h-[500px] bg-[#870e7f] p-4 flex flex-col justify-around  rounded-lg'>

        <div className='flex relative z-10 w-full h-[56px]  '>
          <FaLocationDot className='absolute z-10 text-2xl  h-12 left-2 text-gray-300' />
          <input type="text" placeholder='Enter your location ' className='uppercase py-2 px-4 absolute z-0 w-full text-2xl text-center border rounded-md bg-[#870e7f] ' name='titleCity' value={titleCity} onChange={(event) => {
            setTitleCity(event.target.value);
          }} />
          <FaSearch className='absolute z-10 text-2xl  h-12 right-2 cursor-pointer ' onClick={() => {
            setApiCity(titleCity);
            // console.log(apiCity);
          }} />
        </div>

        <div className='flex flex-col gap-4'>
          {loading ? <div className='w-full flex justify-center h-[340px] items-center'><div className='spinner'></div></div> :
            <div>
              {weatherData.cod === 200 ? ((<div>
                <div className='flex flex-col items-center  justify-center gap-4 py-4' >
                  {weatherData.weather[0].main === "Clouds" && <img src={cloud} alt={imgSrc} className='w-48' />}
                  {weatherData.weather[0].main === "Clear" && <img src={clear} alt={imgSrc} className='w-48' />}
                  {weatherData.weather[0].main === "Mist" && <img src={mist} alt={imgSrc} className='w-48' />}
                  {weatherData.weather[0].main === "Rain" && <img src={rain} alt={imgSrc} className='w-48' />}
                  {weatherData.weather[0].main === "Snow" && <img src={snow} alt={imgSrc} className='w-48' />}


                  <p className='text-white font-bold text-2xl'><span>{((weatherData.main.temp) - 273.15).toFixed(2)}</span>&deg;C</p>
                  <p className='text-white font-semibold text-2xl'>{weatherData.weather[0].description}</p>
                </div>

                <div className='flex justify-between px-2'>
                  <div className='flex  gap-2'>
                    <BiWater className='text-6xl flex items-center text-white ' />
                    <div>
                      <p className='text-[18px] text-white'>{weatherData.main.humidity}%</p>
                      <p className='text-[18px] text-white'>Humidity</p>
                    </div>
                  </div>
                  <div className='flex  gap-2'>
                    <PiWindBold className='text-[52px] flex items-center text-white ' />
                    <div>
                      <p className='text-[18px] text-white'>{(weatherData.wind.speed * 3.6).toFixed(2)} km/hr</p>
                      <p className='text-[18px] text-white'>Wind Speed</p>
                    </div>
                  </div>

                </div>
              </div>)) : (
                <div className='flex flex-col items-center'>
                  <img src={notfound} alt='not found' className='' />
                  <p className='text-white font-semibold text-2xl'> City not found</p>
                </div>
              )}
            </div>}
        </div>

      </div>

    </div>
  );
}

export default App;
