import "./VideoBlock.css";

function VideoBlock({ block }) {
  return (
    <div className='video-block'>
      {block?.data?.url ? (
        <video
          src={block.data.url}
          controls
          width='100%'
          style={{ borderRadius: "8px" }}
        />
      ) : (
        <p className='video-placeholder'>
          No video URL provided.
        </p>
      )}
    </div>
  );
}

export default VideoBlock;
