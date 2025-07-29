import { useEffect, useState } from "react";

import axios from "axios";

import topten from "./assets/topten.png";
import flyingChocoBall from "./assets/chocolateBall.png";
import { motion } from "motion/react";
import buyNowButton from "./assets/buyNowButton.png";
import tempDay from "./assets/tempDay.png";
import tempNight from "./assets/tempNight.png";
import logo from "./assets/logo.png";
// import icecreamBg from "./assets/iceCreameBg.png";
import iceCream from "./assets/iceCream.png";
import sixLayersOfExtra from "./assets/sixLayers.png";
import pack from "./assets/pack.png";
// import nightBg from "./assets/nightBg.png";
// import chocolateBg from "./assets/chocolateBg.png";
// import flyingChocoBallVertical from "./assets/flyingChocoballVertical.png";
// import dayBg from "./assets/dayBg.png";
// import textDay from "./assets/textDay.png";
// import textNight from "./assets/textNight.png";
// import icecream from "./assets/main/iceCream.png";
// import tempNight from "./assets/main/tempNight.png";
// import bgLeft from "./assets/bgLeft.png";
import chocolateSplash from "./assets/chocolateSplash.png";
// import { isMobile } from "react-device-detect";

const DEFAULT_LOCATION = {
  lat: 28.4,
  long: 77.4,
};

function App() {
  const [currTemperature, setCurrTemperature] = useState(30);
  const hour = new Date().getHours();
  const isNight = () => {
    const now = new Date();
    const hour = now.getHours(); // 0–23
    // Night = before 5 AM or 5 PM onwards
    return hour < 5 || hour >= 17;
  };

  useEffect(() => {
    async function getTemperature() {
      // setLoading(true);
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
      }
    }
    getTemperature();
  }, [hour]);

  console.log("rerender")
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
      <div
        className={`overflow-hidden bg-no-repeat bg-cover aspect-video bg-neutral-100  h-auto max-h-screen w-full relative flex`}
      >
        {/* FLYING CHOCOBALL BACKGROUND */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          src={flyingChocoBall}
          className="absolute z-20  px-5"
        />

        {/* LEFT SECTION */}
        <section className="w-[54.5%] bg-cover bg-no-repeat bg-[url(./assets/bgLeft.png)]  border-white relative h-full  ">
          {/* LOGO */}
          <img
            src={logo}
            className="h-[6vw] object-contain z-20 left-[13vw] top-0 absolute"
          />
          <div className="flex flex-col gap-[4vmax] justify-between  h-full z-20 relative w-[75%] pt-7 pb-[6vw] ml-auto">
            {/* TOPTEN */}
            <img
              src={topten}
              className="h-[22%] object-contain z-20 right-[16%] xl:right-[25%] top-[7%] xl:top-[4%] "
            />
            {/* TEXT SECTION */}
            <div className="h-[60%] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                <h6 className="font-shakila [text-shadow:_0px_5px_7px_#000000] shadow-black font-medium text-white text-[3.1vw] text-nowrap text-center">
                  {isNight()
                    ? " Let the Night Melt Away with"
                    : "Take a Midday Break with"}
                </h6>
              </motion.div>
              {isNight() ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <h6 className="[text-shadow:_0px_0.7vw_0.5vw_#3b3b3b]  font-shakila !font-extrabold text-stroke-red-500 text-white text-nowrap text-[5.2vw] xl:text-[4.5vw]  text-center">
                    6 LAYERS OF
                    <br /> CHOCOLATE BLISS!
                  </h6>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <h6 className="[text-shadow:_0px_0.7vw_0.5vw_#3b3b3b]  font-shakila !font-extrabold  text-white text-stroke-red-500 text-nowrap text-[5.2vw] xl:text-[4.5vw] text-center">
                    6 LAYERS OF PURE <br /> DELIGHT!
                  </h6>
                </motion.div>
              )}
            </div>

            <motion.img
              // animate={{
              //   scale: [1, 1.1, 1], // Zoom in to 1.1x, then back to 1x
              // }}
              // transition={{
              //   duration: 0.9,
              //   repeat: Infinity,
              //   repeatType: "loop",
              //   ease: "easeInOut",
              // }}
              src={buyNowButton}
              className=" z-30 h-[5vmax] object-contain "
            />
          </div>

          <img
            src={chocolateSplash}
            className="absolute w-auto h-[20vw] object-cover bottom-[-3vw] right-0"
          />
        </section>

        {/* RIGHT SECTION */}
        <section
          className={`w-[45.5%] pt-[2vw] bg-cover flex flex-col h-full relative bg-no-repeat ${
            isNight()
              ? "bg-[url(./assets/night/nightBg2.png)]"
              : "bg-[url(./assets/day/dayBg2.png)]"
          }`}
        >
          {/* TEMPERATURE */}
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
          </div>

          <div className="flex relative h-full">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
              src={pack}
              className="absolute bottom-[10vw] left-[0vw] h-[30vw] xl:h-[25vw]  w-auto object-contain z-40"
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
              src={iceCream}
              className={`left-[11.5vw] object-contain absolute bottom-[-5vw] h-[50vw] z-30`}
            />
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
              src={sixLayersOfExtra}
              className="  bottom-[1vw] z-10 h-[13vw] left-[1vw] absolute w-auto object-contain "
            />
          </div>
          {/* 
      
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            src={pack}
            className="right-[-17vw] xl:right-[-16.5vw] h-[30vw] xl:h-[25vw] bottom-[0%] md:bottom-[5%] xl:bottom-[1%]  absolute  w-full object-contain z-40"
          /> */}
        </section>

        {/* <img src={bgLeft} className="absolute object-cover h-full w-full" /> */}
      </div>
    </div>
  );
}

export default App;

{
  /* <motion.img
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            src={flyingChocoBallVertical}
            className="absolute w-1/2 top-0 h-full py-[5%] z-20 object-contain right-0  border-white px-5"
          />
        
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            src={chocolateBg}
            className="self-center z-10 absolute top-[21%] xl:top-[13vmax]"
          /> */
}

// TEMPERATURE
