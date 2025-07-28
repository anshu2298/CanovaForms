import "./ImageBlock.css";
const ImageBlock = ({ data }) => {
  console.log(data.data.url);
  return (
    <div className='image-container'>
      {data?.url ? (
        <img
          className='image'
          src={data.data.url}
          alt={data.alt || "Uploaded Image"}
        />
      ) : (
        <p className='fallback-text'>No image uploaded.</p>
      )}
    </div>
  );
};

export default ImageBlock;
