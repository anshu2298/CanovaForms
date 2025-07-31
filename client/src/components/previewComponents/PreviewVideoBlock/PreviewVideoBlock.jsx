import "./PreviewVideoBlock.css";
const PreviewVideoBlock = ({ data }) => {
  return (
    <div className='video-block'>
      <video
        className='video-player'
        controls
        width='100%'
        src={data.url}
      />
    </div>
  );
};

export default PreviewVideoBlock;
