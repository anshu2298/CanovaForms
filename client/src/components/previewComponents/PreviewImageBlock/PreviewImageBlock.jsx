import "./PreviewImageBlock.css";
const PreviewImageBlock = ({ data }) => {
  return (
    <div className='image-container'>
      <img
        className='image'
        src={data.url}
        alt={data.alt}
      />
    </div>
  );
};

export default PreviewImageBlock;
