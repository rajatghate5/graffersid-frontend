import React from "react";
import { Rating } from "@mui/material";

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2; 
  return (
    <Rating
      name="read-only"
      value={roundedRating}
      readOnly
      precision={0.5}
    />
  );
};

export default StarRating;
