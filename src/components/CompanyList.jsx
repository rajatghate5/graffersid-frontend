import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../actions/companyActions";
import CompanyDetails from "./CompanyDetails";

const CompanyList = ({
  city,
  sortOption,
  searchTerm,
  isFindCompanyClicked,
}) => {
  const [currentlyOpenId, setCurrentlyOpenId] = useState("");
  const dispatch = useDispatch();

  const { loading, companies, error } = useSelector(
    (state) => state.companyList
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Filter companies based on the search term
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If Find Company is clicked, filter based on city
  const cityFilteredCompanies = isFindCompanyClicked
    ? city === ""
      ? filteredCompanies // Show all companies if "all" is selected
      : filteredCompanies.filter(
          (company) => company.city.toLowerCase() === city
        )
    : filteredCompanies; // If not clicked, show all

  // Sort the city-filtered companies based on the selected sort option
  const sortedCompanies = [...cityFilteredCompanies].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.averageRating - a.averageRating;
      case "location":
        return a.city.toLowerCase().localeCompare(b.city.toLowerCase());
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto mt-10">
      <p className="text-gray-600">Results Found: {sortedCompanies.length}</p>
      {sortedCompanies.map((company) => (
        <CompanyDetails
          key={company._id}
          company={company}
          currentlyOpenId={currentlyOpenId}
          setCurrentlyOpenId={setCurrentlyOpenId}
        />
      ))}
    </div>
  );
};

export default CompanyList;
