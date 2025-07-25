import { useEffect, useState } from "react";
  
import axios from "axios";

import topten from "./assets/topten.png";
import flyingChocoBall from "./assets/flyingChocoball.png";
import dayBg from "./assets/dayBg.png";
// import buyNowButton from "./assets/buyNowButton.png";
import tempDay from "./assets/tempDay.png";
import nightBg from "./assets/nightBg.png";
import tempNight from "./assets/tempNight.png";
import logo from "./assets/logo.png";
import icecreamBg from "./assets/iceCreameBg.png";
import chocolateBg from "./assets/chocolateBg.png";
import icecream from "./assets/icecream2.png";
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
    <div className="flex min-w-[320px] justify-center flex-col  h-screen w-full relative">
      <div className="aspect-video bg-neutral-100  h-auto max-h-screen overflow-hidden w-full relative flex">
        {/* LEFT SECTION */}
        <section
          className={`h-full w-1/2 flex flex-col relative bg-[url(./assets/bgLeft.png)] `}
        >
          {/* FLYING CHOCOBALL BACKGROUND */}
          <img
            src={flyingChocoBall}
            className="absolute z-30 right-0 h-full object-contain py-[5vw] md:mr-[1vw] xl:py-[4vw] border-white px-5"
          />
          <img src={icecreamBg} className="w-full h-full absolute" />
          {/* right-[9vw] xs:right-[11vw] sm:right-[7.5vw] lg: */}
          <img
            src={topten}
            className="h-[10vw] z-20 absolute right-[9vw] md:right-[11vw] top-[1.5vw] lg:top-[1vw] xl:top-[0.5vw] "
          />
          <img
            src={chocolateBg}
            className="self-center absolute top-[10vw] md:top-[15vw] xl:top-[10vw]"
          />
          <img
            src={icecream}
            className="bottom-[-3vw] object-contain self-center mx-auto absolute w-full  h-[85%] z-30"
          />
          <img
            src={sixLayersOfExtra}
            className="xl:bottom-[-2vw] bottom-[-2vw] right-[-1vw] h-[19vw] md:h-[21vw] xl:h-[18vw] absolute w-full object-contain z-40"
          />
          {/* xs:right-[-100px] sm:right-[-150px] md:right-[-180px]
          lg:right-[-220px] */}
          {/* h-[7rem] xs:h-[11rem] sm:h-[13rem] md:h-[13rem] */}
          <img
            src={pack}
            className="right-[-17vw] xl:right-[-16.5vw] h-[30vw] xl:h-[28vw] bottom-[-1vw] md:bottom-[-1vw]  absolute  w-full object-contain z-40"
          />
        </section>

        {/* RIGHT SECTION */}
        <section className="w-1/2 relative h-full z-50 ">
          {/* DAY BG */}
          <img
            src={isNight ? nightBg : dayBg}
            className="absolute top-0 object-cover z-10 h-full w-full "
          />
          <div className="flex flex-col  absolute top-[7vw] z-20 w-[70%]">
            <div className=" flex z-20 left-0 ">
              <div className="relative  bg-white pl-2 pr-[3.5vw]  items-center flex">
                <p className="font-shakila text-[4vw] text-[#9165c9] font-medium">
                  {currTemperature}&deg;C
                </p>
                <img
                  className="h-full scale-110 right-[-3.5vw] absolute"
                  src={isNight ? tempNight : tempDay}
                />
              </div>
            </div>

            {/* LOGO */}
            <img src={logo} className="h-[6vw] absolute z-20 right-0" />

            <img
              src={isNight ? textNight : textDay}
              className="mt-[6vw] ml-[4vw] z-30 w-full object-contain "
            />

            {/* <img
              src={buyNowButton}
              className="mt-[6vw] z-30 w-full ml-[3.5vw] h-[7vw] object-contain "
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
