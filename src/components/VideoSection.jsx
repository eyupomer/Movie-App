const VideoSection = ({ videoKey }) => {
  return (
    <div className="card w-3/4 h-1/2 m-auto translate-y-24">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
            title="YouTube video"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
    </div>
  );
};

export default VideoSection;
