import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { Button, Typography } from "@mui/material";
import { fetchReviews } from "../actions/reviewActions";
import ErrorBoundary from "./ErrorBoundary";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReviewModal from "./ReviewModal";

const CompanyDetails = ({ company, currentlyOpenId, setCurrentlyOpenId }) => {
  const dispatch = useDispatch();
  const { reviews = [], loading } = useSelector(
    (state) => state.reviewList.reviews
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReviewsClick = useCallback(() => {
    const isCurrentCompanyOpen = currentlyOpenId === company._id;
    setCurrentlyOpenId(isCurrentCompanyOpen ? "" : company._id);
    if (!isCurrentCompanyOpen) {
      dispatch(fetchReviews(company._id));
    }
  }, [currentlyOpenId, company._id, dispatch, setCurrentlyOpenId]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
        <CompanyHeader
          company={company}
          currentlyOpenId={currentlyOpenId}
          handleOpenModal={toggleModal}
          handleViewReviewsClick={handleViewReviewsClick}
        />

        <ReviewSection
          companyId={company._id}
          currentlyOpenId={currentlyOpenId}
          reviews={reviews}
          loading={loading}
        />
      </div>

      <ReviewModal
        open={isModalOpen}
        handleClose={toggleModal}
        id={currentlyOpenId}
      />
    </ErrorBoundary>
  );
};

const CompanyHeader = ({
  company,
  currentlyOpenId,
  handleOpenModal,
  handleViewReviewsClick,
}) => (
  <div className="flex justify-between items-center">
    <CompanyInfo company={company} />
    <ActionButton
      currentlyOpenId={currentlyOpenId}
      handleOpenModal={handleOpenModal}
      handleViewReviewsClick={handleViewReviewsClick}
      companyId={company._id}
    />
  </div>
);

const CompanyInfo = ({ company }) => (
  <div className="flex items-center">
    <div className="linear-bg text-white w-20 h-20 flex items-center justify-center text-4xl font-bold rounded-lg">
      {company.name.charAt(0).toUpperCase()}
    </div>
    <div className="ml-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold capitalize">{company.name}</h2>
      <LocationInfo company={company} />
      <RatingInfo company={company} />
    </div>
  </div>
);

const LocationInfo = ({ company }) => (
  <p className="text-gray-500">
    <Typography className="capitalize">
      <span className="text-gray-700">
        <LocationOnIcon sx={{ fontSize: 20 }} />
      </span>{" "}
      {company.location},{" "}
      {company.city.charAt(0).toUpperCase() + company.city.slice(1)}
    </Typography>
  </p>
);

const RatingInfo = ({ company }) => (
  <div className="flex items-center gap-2">
    <span className="text-base font-bold">{company.averageRating}</span>
    <StarRating rating={company.averageRating} />
    <span className="font-bold text-base">{`${company.totalReviews} Reviews`}</span>
  </div>
);

const ActionButton = ({
  currentlyOpenId,
  handleOpenModal,
  handleViewReviewsClick,
  companyId,
}) => (
  <div className="flex flex-col justify-start items-start gap-3">
    {currentlyOpenId === companyId ? (
      <Button
        onClick={handleOpenModal}
        className="linear-bg w-fit"
        sx={buttonStyles}
      >
        + Add Review
      </Button>
    ) : (
      <Button
        variant="outlined"
        className="ml-auto w-fit"
        sx={outlinedButtonStyles}
        onClick={handleViewReviewsClick}
      >
        Detail Review
      </Button>
    )}
  </div>
);

const buttonStyles = {
  m: 1,
  height: "40px",
  marginTop: 3.5,
  color: "white",
  padding: "0 30px",
  fontWeight: "bold",
  textTransform: "capitalize",
};

const outlinedButtonStyles = {
  backgroundColor: "black",
  color: "white",
  textTransform: "capitalize",
};

const ReviewSection = ({ companyId, currentlyOpenId, reviews, loading }) => (
  <div className="mt-4 flex flex-col">
    {currentlyOpenId === companyId && (
      <>
        <span className="text-xs text-gray-500 ml-5">
          Result Found: {reviews.length || 0}
        </span>
        <div className="mt-4 ml-4">
          {loading ? (
            <p className="text-gray-600">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p className="text-gray-600">No reviews found.</p>
          )}
        </div>
      </>
    )}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="flex flex-row gap-10">
    <div className="bg-gray-500 text-white w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full">
      {review.fullName.charAt(0).toUpperCase()}
    </div>
    <div className="mb-2 border-b pb-2 gap-2 flex flex-col w-full justify-between">
      <ReviewHeader review={review} />
      <p className="text-gray-600">{review.reviewText}</p>
    </div>
  </div>
);

const ReviewHeader = ({ review }) => (
  <div className="flex flex-row justify-between">
    <div className="flex flex-col w-fit gap-3">
      <p className="font-bold">{review.fullName}</p>
      <ReviewDate dateString={review.createdAt} />
    </div>
    <p className="text-gray-600">
      <StarRating rating={review.starRating} />
    </p>
  </div>
);

const ReviewDate = ({ dateString }) => {
  const date = dateString.split("T")[0];
  const [year, month, day] = date.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const time = dateString.split("T")[1].slice(0, 5);

  return (
    <div className="flex flex-row gap-2">
      <p className="text-gray-600 text-xs">{formattedDate}</p>
      <p className="text-gray-600 text-xs">{time}</p>
    </div>
  );
};

export default CompanyDetails;
