import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RateStar from "./RateStar";
import { STAR_RATING_FEEDBACK } from "../constants";
import { useDispatch } from "react-redux";
import { addReview, fetchReviews } from "../actions/reviewActions";

const ReviewModal = ({ open, handleClose, id }) => {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [ratingError, setRatingError] = useState(false); // State to track rating error
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      // Fetch reviews only when the modal is open
      dispatch(fetchReviews(id));
    }
    setFeedbackText(STAR_RATING_FEEDBACK[starRating] || "");
  }, [starRating, open, dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if starRating is greater than 0
    if (starRating === 0) {
      setRatingError(true);
      return; // Prevent form submission if rating is not provided
    }

    const reviewData = { fullName, subject, reviewText, starRating, id };
    dispatch(addReview(reviewData)).then(() => {
      dispatch(fetchReviews(id));
    });
    handleClose();
  };

  const renderTextField = (
    label,
    value,
    setter,
    placeholder,
    multiline = false,
    rows = 1
  ) => (
    <div className="flex flex-col">
      <label className="text-gray-500 text-sm">{label}</label>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => setter(e.target.value)}
        required
        multiline={multiline}
        rows={multiline ? rows : 1}
      />
    </div>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex items-center justify-center h-full">
        <div className="relative bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border max-h-[100vh] overflow-hidden">
          <div className="absolute top-0 left-0">
            <div className="w-24 h-24 bg-purple-500 rounded-full absolute left-[-50px] top-0 z-10" />
            <div className="w-24 h-24 bg-purple-200 rounded-full absolute left-0 top-[-40px] z-0" />
          </div>
          <div className="flex">
            <IconButton
              onClick={handleClose}
              edge="end"
              color="inherit"
              aria-label="close"
              sx={{ position: "absolute", top: 8, right: 14 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h5"
              className="mb-8 text-center font-bold w-full"
            >
              Add Review
            </Typography>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-7">
            {renderTextField("Full Name", fullName, setFullName, "Enter")}
            {renderTextField("Subject", subject, setSubject, "Enter")}
            {renderTextField(
              "Enter your Review",
              reviewText,
              setReviewText,
              "Description",
              true,
              4
            )}

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: 20, letterSpacing: 1 }}
            >
              Rating:
            </Typography>
            <div className="flex justify-between">
              <RateStar rating={starRating} setRating={setStarRating} />
              {feedbackText && (
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontSize: 14 }}
                  className="text-gray-500"
                >
                  {feedbackText}
                </Typography>
              )}
            </div>

            {/* Error message for star rating */}
            {ratingError && (
              <Typography color="error" sx={{ fontSize: 12, mt: 1 }}>
                Rating is required. Please provide a rating.
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              className="my-4 w-fit linear-bg self-center"
              sx={{ textTransform: "capitalize" }}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
