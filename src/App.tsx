import { useEffect, useState } from "react";

import axios from "axios";

import topten from "./assets/topten.png";
import flyingChocoBall from "./assets/flyingChocoball.png";
import flyingChocoBallVertical from "./assets/flyingChocoballVertical.png";
import dayBg from "./assets/dayBg.png";
import buyNowButton from "./assets/buyNowButton.png";
import tempDay from "./assets/tempDay.png";
import nightBg from "./assets/nightBg.png";
import tempNight from "./assets/tempNight.png";
import logo from "./assets/logo.png";
// import icecreamBg from "./assets/iceCreameBg.png";
import chocolateBg from "./assets/chocolateBg.png";
import icecream from "./assets/icecream2.png";
import sixLayersOfExtra from "./assets/sixLayersOfExtra.png";
import pack from "./assets/pack.png";
// import textDay from "./assets/textDay.png";
// import textNight from "./assets/textNight.png";
import { motion } from "motion/react";
// import icecream from "./assets/main/iceCream.png";
// import tempNight from "./assets/main/tempNight.png";
import bgLeft from "./assets/bgLeft2.png";
// import { isMobile } from "react-device-detect";

const DEFAULT_LOCATION = {
  lat: 28.4,
  long: 77.4,
};

function App() {
  const [currTemperature, setCurrTemperature] = useState(30);
  const [loading, setLoading] = useState(false);
  // const [isNight, setIsNight] = useState(false);
  const isNight = () => {
    const now = new Date();
    const hour = now.getHours(); // 0–23
    // console.log(hour)
    // Night = before 5 AM or 5 PM onwards
    return hour < 5 || hour >= 17;
  };
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
        // const sunriseTime = data.sys.sunrise * 1000;
        // const sunsetTime = data.sys.sunset * 1000;
        // const isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
        // if (!isDaytime) setIsNight(true);
      } catch (error) {
        console.error("Error fetching temprature data:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }
    getTemperature();
  }, []);

  // console.log({isMobile})
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
        {/* FLYING CHOCOBALL BACKGROUND */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        > */}
        <motion.img
          // initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          src={flyingChocoBall}
          className="absolute z-20 self-center  w-full px-5"
        />
        {/* </motion.div> */}
        <section
          className={`h-full w-1/2 flex flex-col relative`}
          // className={`h-full w-1/2 flex flex-col relative  bg-[url(./assets/bgLeft2.png)] bg-cover`}
        >
          <img src={bgLeft} className="absolute object-cover h-full w-full" />
          <motion.img
            // initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              // repeat: Infinity,
              // repeatType: "loop",
            }}
            src={flyingChocoBallVertical}
            className="absolute w-1/2 top-0 h-full py-[5%] z-20 object-contain right-0  border-white px-5"
          />
          {/* <img
            src={icecreamBg}
            className="w-full h-full object-contain absolute"
          /> */}
          <img
            src={topten}
            className="xl:h-[8vw] h-[10vw] z-20 absolute right-[16%] xl:right-[25%] top-[7%] xl:top-[4%] "
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            src={chocolateBg}
            className="self-center z-10 absolute top-[21%] xl:top-[13vmax]"
          />
          <motion.img
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              duration: 1,
            }}
            src={icecream}
            className={`landscape:xl:bottom-[-6vmax] xl:bottom-[-7vmax] bottom-[-3vmax] lg:bottom-[-5vmax]  md:left-[0.4vmin] left-[1vmin] object-contain absolute w-full  h-[85%] z-30`}
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            src={sixLayersOfExtra}
            className=" xl:bottom-[-5%] bottom-0 xl:right-[-2%] right-[-1%] h-[19vw] md:h-[21vw] xl:h-[18vw] absolute w-full object-contain z-40"
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            src={pack}
            className="right-[-17vw] xl:right-[-16.5vw] h-[30vw] xl:h-[25vw] bottom-[0%] md:bottom-[5%] xl:bottom-[1%]  absolute  w-full object-contain z-40"
          />
        </section>

        {/* RIGHT SECTION */}
        <section className="w-1/2 relative h-full z-50 ">
          {/* DAY BG */}
          <img
            src={isNight() ? nightBg : dayBg}
            className="absolute top-0 object-cover z-10 h-full w-full "
          />
          <div className="flex flex-col mt-[10%] h-[90%] border-white absolute z-20 w-[70%]">
            {/* header */}

            <div className=" flex z-20 left-0 justify-between">
              <div className="relative  bg-white pl-2 pr-[3.5vw]  items-center flex">
                <p className="font-shakila text-[4vw] text-[#9165c9] font-medium">
                  {currTemperature}&deg;C
                </p>
                <img
                  className="h-full scale-110 right-[-3.5vw] absolute"
                  src={isNight() ? tempNight : tempDay}
                />
              </div>
              {/* LOGO */}
              <img src={logo} className="h-[6vw] z-20 right-0" />
            </div>

            <div className="h-full flex flex-col justify-center xs:gap-[4vw] gap-[1.5vw]">
              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                <div className="ml-[5vw]">
                  <h6 className="font-shakila [text-shadow:_0px_5px_7px_#000000] shadow-black font-medium text-white text-[3vw] text-nowrap text-center">
                    {isNight()
                      ? " Let the Night Melt Away with"
                      : "Take a Midday Break with"}
                  </h6>
                  {isNight() ? (
                    <h6 className="[text-shadow:_0px_6px_6px_#101112] shadow-black font-shakila !font-extrabold text-stroke-red-500 text-white text-nowrap text-[5.1vw] xl:text-[4.5vw]  text-center">
                      6 LAYERS OF
                      <br /> CHOCOLATE BLISS!
                    </h6>
                  ) : (
                    <h6 className="[text-shadow:_0px_6px_6px_#101112] shadow-black font-shakila !font-extrabold  text-white text-stroke-red-500 text-nowrap text-[5.1vw] xl:text-[4.5vw] text-center">
                      6 LAYERS OF PURE <br /> DELIGHT!
                    </h6>
                  )}
                </div>
                {/* <img
                    src={isNight() ? textNight : textDay}
                    className=" ml-[4vw]  z-30 w-full xl:h-full md:h-[150%] h-[80%] object-contain "
                  /> */}
              </motion.div>
              {/* Buy Now */}
              <motion.img
                animate={{
                  scale: [1, 1.1, 1], // Zoom in to 1.1x, then back to 1x
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                src={buyNowButton}
                className=" z-30 w-full ml-[3.5vw] h-[5vw] object-contain "
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
