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
import sixLayersOfExtra from "./assets/sixLayersOfExtra.png";
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
  console.log(loading);
  useEffect(() => {
    async function getTemperature() {
      setLoading(true);
      try {
        const location = await getCurrentLocation();
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              //@ts-ignore
              lat: location?.lat || DEFAULT_LOCATION.lat,
              //@ts-ignore
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
        if (!isDaytime) setIsNight(true);
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
    <div className="flex min-w-[320px]  flex-col  h-screen w-full relative">
      <div className="aspect-video bg-neutral-100  h-auto w-full relative flex rounded-xl">
        {/* FLYING CHOCOBALL BACKGROUND */}
        <img
          src={flyingChocoBall}
          className="absolute z-30 self-center  w-full px-5"
        />
        {/* LEFT SECTION */}
        <section
          className={`h-full w-1/2 flex flex-col relative bg-[url(./assets/bgLeft.png)] `}
        >
          <img
            src={icecreamBg}
            className="aspect-auto w-full h-full absolute"
          />
          <img
            src={topten}
            className="aspect-auto h-8 xs:h-12 md:h-16 lg:h-20 absolute right-2 top-5 lg:top-10 xs:right-4 md:right-10 lg:right-20"
          />
          <img
            src={chocolateBg}
            className="self-center absolute top-[30%] xs:top-[20%]"
          />
          <img
            src={icecream}
            className="absolute w-full object-cover h-full left-[55px] xs:left-[60px] md:left-[70px] lg:left-[80px] z-30"
          />
          <img
            src={sixLayersOfExtra}
            className="right-5 absolute w-full h-[5rem] xs:h-[6rem] sm:h-[10rem] md:h-[10rem] xl:h-[15rem] object-contain bottom-0 z-40"
          />
          <img
            src={pack}
            className="absolute bottom-0 xs:bottom-3 sm:bottom-5 md:bottom-7 lg:bottom-10 w-full h-[7rem] xs:h-[11rem] sm:h-[13rem] md:h-[13rem] xl:h-[16rem] object-contain right-[-70px] xs:right-[-100px] sm:right-[-150px] md:right-[-180px] lg:right-[-220px] z-40"
          />
        </section>

        {/* RIGHT SECTION */}
        <section className="w-1/2 relative h-full z-50 ">
          {/* DAY BG */}
          <img
            src={isNight ? nightBg : dayBg}
            className="absolute top-0 object-cover z-10 h-full w-full "
          />
          <div className="flex flex-col  absolute top-[4vw] z-20 gap-8 w-[70%]">
            <div className=" flex z-20 left-0 top-[1vw]">
              <div className="relative gap-4 bg-white rounded-r-full pl-2 pr-4 sm:pr-8  items-center flex">
                <p className="font-shakila text-[4vw] text-[#9165c9] font-medium">
                  {currTemperature}&deg;C
                </p>
                <img
                  className="h-7 xs:h-8 md:h-10 lg:h-16 right-[-14px] xs:right-[-18px] md:right-[-20px] lg:right-[-40px] absolute"
                  src={isNight ? tempNight : tempDay}
                />
              </div>
            </div>

            {/* LOGO */}
            <img src={logo} className="h-[8vw] absolute -top-2 z-20 right-0" />

            <img
              src={isNight ? textNight : textDay}
              className=" lg:mt-8 ml-6 z-30 w-full object-contain "
            />

            <img
              src={buyNowButton}
              className=" z-30 w-full ml-6 h-5 sm:h-8 lg:h-10 object-contain "
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
