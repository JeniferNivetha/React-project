import React from "react";



const WeatherDetails =({icon,temp,city,country,cityColor,lat,log,humidityIconState,windSmallState,humidity,wind}) =>{
 
   
    
return (
<>
 <div className="icons">
    <img classname="iconimage" src ={icon} alt="image"/>

 </div>
 <div className="temp">{temp}&#176;C</div>
 <div className="location" style={{color:cityColor}}>{city}</div>
 
 <div className="country">{country}</div>
<div className="card">
<div>
    <span className="lat">Latitude</span>
    <span>{lat}</span>
</div>
<div>
    <span className="log">Logitude</span>
    <span>{log}</span>
</div>
 
</div>

<div className="humicontainer">
    <div className="element">
        <img className="humiicon" src={humidityIconState} alt="humiicon"/>
    <div className="data">
        <div className="datacontainer">{humidity}%</div>
        <div className="humitext">humidity</div>
    </div>
    </div>


    <div className="element1">
        <img className="humiicon" src={windSmallState} alt="humiicon"/>
    <div className="data">
        <div className="datacontainer">{wind}km/hr</div>
        <div className="humitext">Wind speed</div>
    </div>
    </div>

</div>

</>

    )
}

export default WeatherDetails;