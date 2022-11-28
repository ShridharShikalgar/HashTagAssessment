import React, { useRef, useState, useEffect} from "react";
// import ReactDOM from "react-dom";
// import { render } from "react-dom";
import videojs from "video.js";
import _ from "videojs-contrib-quality-levels";
// import qualitySelector from "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";

const App = () => {
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = "e2280eeb-4cdb-43e7-a34f-36868326b8cb";
  const thumbnailURL = "https://vz-a2adf92d-b24.b-cdn.net/e2280eeb-4cdb-43e7-a34f-36868326b8cb/thumbnail.jpg";
  const liveURL = "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8";
  useEffect(() => {
    if (player) {
      player.src({
        src: liveURL,
        type: "application/x-mpegURL",
        withCredentials: false
      });
      player.poster("");
      setCallFinishVideoAPI(false);
      setVidDuration(50000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, liveURL, thumbnailURL]);

  useEffect(() => {
    if (callFinishVideoAPI) {
      //finishesVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callFinishVideoAPI]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      preload: "auto",
      controls: true,
      poster: "",
      sources: [
        {
          src: liveURL,
          type: "application/x-mpegURL",
          withCredentials: false
        }
      ],
      html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true
      }
    };

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        // console.log('onPlayerReady');
      }
    );

    setPlayer(p);
    console.log(p.qualityLevels());

    return () => {
      if (player) player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);
  return (
    <div data-vjs-player>
      <video
        style={{width:'100%',height:'80vh'}}
        ref={videoRef}
        onLoadedMetadata={(e, px) => {
          // console.log(e.target.duration);
          setVidDuration(e.target.duration);
        }}
        onTimeUpdate={(e) => {
          if (e.target.currentTime >= vidDuration - 10) {
            setCallFinishVideoAPI(true);
          }
        }}
        className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
      ></video>
    </div>
  );
};
export default App;