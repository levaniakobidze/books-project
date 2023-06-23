import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import axios from "axios";

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    setLoading(true);

    try {
      const resp = await axios.get(process.env.NEXT_PUBLIC_URL + "/api/videos");
      setVideos(resp.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      {videos ? (
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
            {videos &&
              videos.map((video: { url: string }, index) => {
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
      ) : null}
    </>
  );
};

export default VideoSlider;
