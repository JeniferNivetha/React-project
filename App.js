import { useEffect, useState} from "react";
import './App.css'; 
import WeatherDetails from "./weather.app/weatherdetail";
import windSmall from './assets/wind-icon-png-17.jpg'


import drizzleIcon from './assets/drizzleicon.webp';
import rainIcon from './assets/rainicon.png';
import snowIcon from './assets/snow.png';
import sunIcon from './assets/sunicon.webp';
import windIcon from './assets/wind.png';
import searchIcon from './assets/search.png';
import humidityIcon from './assets/humidity.webp';
import clearIcon from './assets/clear.png';


const App=()=>{

  let api_key="ff81a61493cd8a1331721c159684ab89";

  const[icon,setIcon]=useState(clearIcon);
  const[humidityIconState,setHumidityicon]=useState(humidityIcon); 
  const[windSmallState,setWindstate]=useState(windSmall);  
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState('CHENNAI')
  const[country,setCountry]=useState('IN')
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[text,setText]=useState("chennai")
  const[humidity,setHumidity]=useState(0)
  const[wind,setWind]=useState(0)
  const[cityColor,setCitycolor]=useState('#ffbc00')
const[citynotfound,setCitynotfound]=useState(false);
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null)


const weatherIconMap={
   "01d" : sunIcon,
   "01n" : sunIcon,
   "02d" : windIcon,
   "02n" : windIcon,
   "03d" : windIcon,
   "03n" : windIcon,
   "04d" : drizzleIcon,
   "04n" : rainIcon,
   "09d" : rainIcon,
   "09n" : rainIcon,
   "10d" : snowIcon,
   "10n" : snowIcon,
   "13d" : snowIcon,
   "13n" : snowIcon,
};



  const search = async () => {

    setLoading(true);
  
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

  try {
   let res= await fetch(url);
   let data = await res.json();
   //console.log(data);
   if (data.cod==="404"){
    console.error("city not found")
    setCitynotfound(true)
    setLoading(false)
    return
   }
   setHumidity(data.main.humidity);
   setWind(data.wind.speed);
   setTemp(Math.floor(data.main.temp));
   setCity(data.name)
   setCountry(data.sys.country);
   setLat(data.coord.lat);
   setLog(data.coord.lon);
   const weatherIconCode = data.weather[0].icon;
   setCitycolor ( weatherIconCode > "09d" ? "darkblue" : '#ffbc00');

   setIcon(weatherIconMap[weatherIconCode] || clearIcon)
   setCitynotfound(false)

   } catch (error){
    console.error("an erroe occured:",error.message);
    setError('an error occured while fetching data...')
   } finally{
setLoading(false);
}
  }
;


const handleweather =(e)=>{
  setText(e.target.value);
}

const handlekeyDown=(e)=>{
  if (e.key==="Enter"){
    search();
  }
}

useEffect(function (){
  search()
},[]);

return(
<>
  <div className="app-container">
    <div className="input-container">
<input 
 type="text"
 placeholder="search any city"
 className="cityinput"
 onChange={handleweather}
 onKeyDown={handlekeyDown}
 value={text}
 />
 
  <div className="search-icon" onClick={()=>search()}>
    <img className="image" src={searchIcon} alt="image"/>
  </div>
    </div>



  {loading && <div className="loading">loading....</div>}
  {citynotfound && <div className="citynotfound">CITY NOT FOUND</div>}
  {error && <div className="error">{error}</div>}

   {!loading && !citynotfound && !error && <WeatherDetails icon ={icon} cityColor={cityColor}
   humidity={humidity} wind={wind} humidityIconState={humidityIconState} windSmallState={windSmallState}  temp={temp}  city={city} country={country} lat={lat} log={log}/>}
  
  </div>
  </>
)
}


export default App;
