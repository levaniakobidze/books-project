import React, { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedId, setSelectedId] = useState("");

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

  const handleDeleteVideo = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(process.env.NEXT_PUBLIC_URL + `/api/videos/${id}`);
      getVideos();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function encodeEmbedLink(url: string) {
    const encodedUrl = encodeURIComponent(url);
    return encodedUrl;
  }
  function convertToEmbedLink(url: string) {
    const regex = /[?&]v=([^&#]*)/i;
    const match = url.match(regex);
    if (match && match[1]) {
      const videoId = match[1];
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      return embedLink;
    } else {
      return null;
    }
  }

  const addVideo = async () => {
    const embedLink: any = convertToEmbedLink(videoUrl);
    const encodedUrl = encodeEmbedLink(embedLink);
    console.log(encodedUrl);
    setLoading(true);
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_URL + `/api/videos/${encodedUrl}`
      );
      setVideoUrl("");
      getVideos();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center my-3"></div>
      <div className="grid grid-cols-3 gap-5 ">
        {videos &&
          videos.map((video: { url: string; id: string }, index) => {
            return (
              <div key={index} className="shadow-lg">
                <iframe
                  className=" w-[100%] shadow-lg border-4 bg-[#6ca0d1] rounded-sm border-[#6ca0d1] "
                  width="380"
                  height="245"
                  src={video.url}
                  title="YouTube video player"
                  //   frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  // allowfullscreen
                ></iframe>
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedId(video.id);
                    handleDeleteVideo(video.id);
                  }}
                  className="w-full bg-red-500 hover:bg-red-400 rounded-lg mt-2 p-3 text-white font-bold">
                  წაშლა {loading && selectedId === video.id && "..."}
                </button>
              </div>
            );
          })}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="flex justify-between shadow-xl  items-center px-5 rounded-md my-10">
        <input
          className="flex-1 outline-none border-0 py-5"
          type="text"
          value={videoUrl}
          placeholder="შეიყვანეთ ვიდეოს embed - ლინკი"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <div>
          <button
            disabled={loading || !videoUrl}
            onClick={addVideo}
            className="bg-green-400 p-3  text-white font-bold rounded-md ">
            ვიდეოს დამატება
          </button>
        </div>
      </div>
    </>
  );
};

export default Videos;
