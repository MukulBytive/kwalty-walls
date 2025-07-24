import { useEffect, useState } from "react";

import axios from "axios";

import bgLeft from "./assets/bgLeft.png";
import topten from "./assets/topten.png";
import flyingChocoBall from "./assets/flyingChocoball.png";
import dayBg from "./assets/dayBg.png";
import buyNowButton from "./assets/buyNowButton.png";
import tempDay from "./assets/main/tempDay.png";
import logo from "./assets/main/logo.png";
import text from "./assets/main/text.png";
import icecreamBg from "./assets/iceCreameBg.png"
import chocolateBg from "./assets/chocolateBg.png";
import icecream from "./assets/icecream.png";
import sixLayersOfExtra from "./assets/6layersOfExtra.png";
import pack from "./assets/pack.png";
import textDay from "./assets/textDay.png";








// import icecream from "./assets/main/iceCream.png";
// import tempNight from "./assets/main/tempNight.png";

const DEFAULT_LOCATION = {
  lat: 28.4,
  long: 77.4,
};

function App() {
  const [currTemperature, setCurrTemperature] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTemperature() {
      setLoading(true);
      try {
        // Make the API request using Axios
        const location = await getCurrentLocation();
        console.log({ location });
        // const { data } = await axios.get(
        //   "https://api.openweathermap.org/data/2.5/weather",
        //   {
        //     params: {
        //       lat: location?.lat || DEFAULT_LOCATION.lat,
        //       lon: location?.long || DEFAULT_LOCATION.long,
        //       appid: "947ab204f923e1895bf76a4f07e070b6",
        //       units: "metric",
        //     },
        //   }
        // );
        // setCurrTemperature(data?.main?.temp?.toFixed(0));
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
            console.log({ long, lat });
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
    <div className="font-Sha flex items-center flex-col h-[100vh] justify-center w-full  ">
      <div className="aspect-video bg-neutral-100 h-[30rem]  relative flex rounded-xl">
        {/* FLYING CHOCOBALL BACKGROUND */}
        <img
          src={flyingChocoBall}
          className="absolute z-30 self-center  w-full px-5"
        />
        {/* LEFT SECTION */}
        <section className="h-full w-1/2 flex flex-col relative bg-[url(./assets/bgLeft.png)]">
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
          {/* <div className="bg-[#8b43b0] z-20 w-full h-full absolute opacity-50" /> */}
          {/* <img src={bgLeft} className="w-full h-full z-10" /> */}
          {/* <div className="absolute top-0 justify-between pt-8 pb-19 flex flex-col z-30 h-full items-center w-full">
            <img src={topten} className="h-20" />
            <img src={text} className="h-40" />
            <img src={buyNowButton} className="h-12" />
          </div> */}
        </section>

        {/* RIGHT SECTION */}
        <section className="w-1/2 relative h-full z-50 ">
          {/* TEMPERATURE */}

          {/* DAY BG */}
          <img
            src={dayBg}
            className="absolute top-0 object-cover z-10 h-full w-full "
          />
          <div className="flex flex-col absolute top-14 z-20 gap-8 w-[70%]">

            <div className=" flex z-20 left-0 top-14">
              <div className="relative bg-white rounded-r-full px-2 pr-12 items-center flex">
                <p className="font-shakila text-3xl text-[#9165c9] font-medium">
                  {currTemperature}&deg;C
                </p>
                <img className="h-11 right-0 absolute" src={tempDay} />
              </div>
            </div>

            {/* LOGO */}
            <img src={logo} className="h-14 absolute -top-5 z-20 right-0" />

            <img src={textDay} className="mt-8 ml-6 z-30 w-full object-contain " />

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
