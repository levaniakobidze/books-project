import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import Image from "next/image";

function VideoSlider() {
  const [data, setData] = useState([
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
    { url: "https://www.youtube.com/embed/rN-1A_uALmg" },
  ]);

  return (
    <div>
      <Splide
        options={{
          breakpoints: {
            640: {
              perPage: 2,
              arrows: false,
            },
            525: {
              perPage: 1,
              arrows: false,
            },
          },

          width: "100%",
          gap: "1rem",
          perPage: 3,
          arrows: false,
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
          data.map((video: any, index) => {
            return (
              <SplideSlide key={index}>
                <iframe
                  className="w-[100%]"
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
