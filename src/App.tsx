import { useEffect, useState } from "react";
  
import axios from "axios";

import topten from "./assets/topten.png";
import flyingChocoBall from "./assets/flyingChocoball.png";
import dayBg from "./assets/dayBg.png";
import buyNowButton from "./assets/buyNowButton.png";
import tempDay from "./assets/tempDay.png";
import nightBg from "./assets/nightBg.png";
import tempNight from "./assets/tempNight.png";
import logo from "./assets/logo.png";
import icecreamBg from "./assets/iceCreameBg.png";
import chocolateBg from "./assets/chocolateBg.png";
import icecream from "./assets/icecream.png";
import sixLayersOfExtra from "./assets/6layersOfExtra.png";
import pack from "./assets/pack.png";
import textDay from "./assets/textDay.png";
import textNight from "./assets/textNight.png";


// import icecream from "./assets/main/iceCream.png";
// import tempNight from "./assets/main/tempNight.png";

const DEFAULT_LOCATION = {
  lat: 28.4,
  long: 77.4,
};

function App() {
  const [currTemperature, setCurrTemperature] = useState(30);
  const [loading, setLoading] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    async function getTemperature() {
      setLoading(true);
      try {
        // Make the API request using Axios
        const location = await getCurrentLocation();
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: location?.lat || DEFAULT_LOCATION.lat,
              lon: location?.long || DEFAULT_LOCATION.long,
              appid: "947ab204f923e1895bf76a4f07e070b6",
              units: "metric",
            },
          }
        );
        setCurrTemperature(data?.main?.temp?.toFixed(0));
        const sunriseTime = data.sys.sunrise * 1000; // Convert UNIX timestamp to milliseconds
        const sunsetTime = data.sys.sunset * 1000; // Convert UNIX timestamp to milliseconds
        const currentTime = new Date().getTime();
        const isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
        if(!isDaytime) setIsNight(true)
      } catch (error) {
        console.error("Error fetching temprature data:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }
    getTemperature();
  }, []);

  function getCurrentLocation() {
    return new Promise((resolve) => {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            resolve({ long, lat });
          },
          (error) => {
            resolve(DEFAULT_LOCATION);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            }
          }
        );
    });
  }
  return (
    <div className="flex items-center flex-col h-[100vh] justify-center w-full  ">
      <div className="aspect-video bg-neutral-100 h-[30rem]  relative flex rounded-xl">
        {/* FLYING CHOCOBALL BACKGROUND */}
        <img
          src={flyingChocoBall}
          className="absolute z-30 self-center  w-full px-5"
        />
        {/* LEFT SECTION */}
        <section className={`h-full w-1/2 flex flex-col relative bg-[url(./assets/bgLeft.png)] `}>
          <img src={icecreamBg} className="w-full h-full absolute" />
          <img src={topten} className="h-20 absolute top-10 right-20" />
          <img src={chocolateBg} className="self-center absolute top-[100px]" />
          <img
            src={icecream}
            className="absolute w-full object-cover h-full left-[80px] z-30"
          />
          <img
            src={sixLayersOfExtra}
            className="absolute w-full  h-[11rem] object-contain bottom-0 z-40"
          />
          <img
            src={pack}
            className="absolute w-full  h-[14rem] object-contain bottom-10 right-[-190px] z-40"
          />

        </section>

        {/* RIGHT SECTION */}
        <section className="w-1/2 relative h-full z-50 ">
          {/* TEMPERATURE */}

          {/* DAY BG */}
          <img
            src={isNight ? nightBg : dayBg}
            className="absolute top-0 object-cover z-10 h-full w-full "
          />
          <div className="flex flex-col absolute top-14 z-20 gap-8 w-[70%]">
            <div className=" flex z-20 left-0 top-14">
              <div className="relative bg-white rounded-r-full px-2 pr-12 items-center flex">
                <p className="font-shakila text-3xl text-[#9165c9] font-medium">
                  {currTemperature}&deg;C
                </p>
                <img className="h-11 right-0 absolute" src={isNight ? tempNight : tempDay} />
              </div>
            </div>

            {/* LOGO */}
            <img src={logo} className="h-14 absolute -top-5 z-20 right-0" />

            <img
              src={isNight ? textNight : textDay}
              className="mt-8 ml-6 z-30 w-full object-contain "
            />

            <img
              src={buyNowButton}
              className=" z-30 w-full ml-6 h-10 object-contain "
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
