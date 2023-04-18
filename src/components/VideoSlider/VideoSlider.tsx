import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import Image from "next/image";

function VideoSlider() {
  const [data, setData] = useState([
    { url: "https://www.youtube.com/embed/FGHHGZ0_-jE" },
    { url: "https://www.youtube.com/embed/RysLnh_YwTw" },
    { url: "https://www.youtube.com/embed/ZniobJ1H47M" },
    { url: "https://www.youtube.com/embed/FGHHGZ0_-jE" },
    { url: "https://www.youtube.com/embed/RysLnh_YwTw" },
    { url: "https://www.youtube.com/embed/ZniobJ1H47M" },
    { url: "https://www.youtube.com/embed/FGHHGZ0_-jE" },
    { url: "https://www.youtube.com/embed/RysLnh_YwTw" },
    { url: "https://www.youtube.com/embed/ZniobJ1H47M" },
  ]);

  return (
    <div className="z-1 bg-blue-400 mb-20">
      <Splide
        className="w-[100%]"
        options={{
          breakpoints: {
            640: {
              perPage: 2,
              arrows: true,
            },
            525: {
              perPage: 1,
              arrows: false,
            },
          },

          // gap: "1rem",
          perPage: 3,
          arrows: true,
          //   trimSpace: true,
          handslide: true,
          type: "loop",
          drag: "free",
          trimSpace: true,
          autoplay: true,
          rewind: true,
          rewindSpeed: 5000,
          interval: 4000,
        }}
        aria-label="My Favorite Images">
        {data &&
          data.map((video: { url: string }, index) => {
            return (
              <SplideSlide key={index}>
                <iframe
                  className=" w-[100%] shadow-lg border-4 bg-[#6ca0d1] border-[#6ca0d1] "
                  width="380"
                  height="245"
                  src={video.url}
                  title="YouTube video player"
                  //   frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // allowfullscreen
                ></iframe>
              </SplideSlide>
            );
          })}
      </Splide>
    </div>
  );
}

export default VideoSlider;
