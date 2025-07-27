const ImageBlock = ({ data }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      {data?.url ? (
        <img
          src={data.url}
          alt={data.alt || "Uploaded Image"}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      ) : (
        <p style={{ color: "gray" }}>No image uploaded.</p>
      )}
    </div>
  );
};

export default ImageBlock;
