import React from "react";
import { Star } from "@mui/icons-material"; 

const RateStar = ({ rating, setRating }) => {
  const handleRatingClick = (value) => {
    setRating(value); 
  };

  const renderStar = (starIndex) => {
    const isHalfStar = rating >= starIndex - 0.5 && rating < starIndex;

    return (
      <span
        key={starIndex}
        className="cursor-pointer"
        onClick={() => handleRatingClick(starIndex)}
        style={{
          color: rating >= starIndex ? "#faaf00" : "#ccc",
          position: "relative",
        }}
      >
        <Star fontSize="large" /> 
        {isHalfStar && (
          <Star
            fontSize="large"
            style={{
              color: "#faaf00",
              position: "absolute",
              width: "50%",
              left: 0,
              top: 0,
              overflow: "hidden",
            }}
          />
        )}
      </span>
    );
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => renderStar(i + 1))}
    </div>
  );
};

export default RateStar;
