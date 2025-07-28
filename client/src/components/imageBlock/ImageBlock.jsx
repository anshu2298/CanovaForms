import "./ImageBlock.css";
const ImageBlock = ({ data }) => {
  return (
    <div className='image-container'>
      {data?.data?.url ? (
        <img
          className='image'
          src={data.data.url}
          alt={data.data.alt || "Uploaded Image"}
        />
      ) : (
        <p className='fallback-text'>No image uploaded.</p>
      )}
    </div>
  );
};

export default ImageBlock;
