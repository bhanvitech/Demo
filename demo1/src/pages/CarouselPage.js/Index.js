import React from "react";
import useFetch from "../../hooks/useFetchUsers";
import "./style.css";

const CarouselPage = () => {
  const { data, loading, error } = useFetch("https://picsum.photos/v2/list");

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // If data is loading, show a loader, if there's an error, show an error message.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // If no data is available, display a message.
  if (!data || data.length === 0) return <div>No images available.</div>;

  const handlePrev = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : data.length - 1); // Loop to the last image
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex < data.length - 1 ? currentIndex + 1 : 0); // Loop to the first image
  };

  return (
    <div className="container">
      {/* Left Button */}
      <div className="left" onClick={handlePrev}>
        {"<"}
      </div>

      {/* Carousel Image */}
      <div className="img">
        <img
          src={data[currentIndex]?.download_url}
          alt={data[currentIndex]?.author}
        />
        <p>{data[currentIndex]?.author}</p>
      </div>

      {/* Right Button */}
      <div className="right" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
};

export default CarouselPage;
