import "./VideoBlock.css";

function VideoBlock({ block }) {
  return (
    <div className='video-block'>
      {block?.data?.url ? (
        <video
          src={block.data.url}
          controls
          width='100%'
          className='video-player'
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
