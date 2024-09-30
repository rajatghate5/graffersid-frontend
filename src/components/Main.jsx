import React, { useState } from "react";
import { Button, Select, MenuItem, FormControl, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CITIES } from "../constants";
import CompanyList from "./CompanyList";

const Main = ({ handleOpen, searchTerm }) => {
  const [city, setCity] = useState("all");
  const [newCity, setNewCity] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [isFindCompanyClicked, setIsFindCompanyClicked] = useState(false);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFindCompanyClick = () => {
    setIsFindCompanyClicked(true);
    setNewCity(city === "all" ? "" : city); // Set newCity to "" if city is "all"
  };

  const handleCityChange = (event) => {
    setCity(event.target.value.toLowerCase());
  };

  return (
    <main
      className="main-container"
      style={{ width: "80%", margin: "20px auto", padding: "16px 0" }}
    >
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={3} lg={3}>
          <CitySelector city={city} handleCityChange={handleCityChange} />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <FindCompanyButton handleFindCompanyClick={handleFindCompanyClick} />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <AddCompanyButton handleOpen={handleOpen} />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <SortSelector
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
        </Grid>
      </Grid>

      <CompanyList
        city={isFindCompanyClicked ? newCity : ""} // Pass "" if "all" is selected
        sortOption={sortOption}
        searchTerm={searchTerm}
        isFindCompanyClicked={isFindCompanyClicked} // Pass the state
      />
    </main>
  );
};

const CitySelector = ({ city, handleCityChange }) => (
  <div>
    <p className="text-gray-500">Select City</p>
    <FormControl fullWidth sx={{ minWidth: "200px" }}>
      <Select
        labelId="city-select-label"
        value={city}
        onChange={handleCityChange}
        inputProps={{
          style: {
            height: "40px",
            padding: "0 10px",
          },
        }}
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
        IconComponent={LocationOnIcon}
      >
        <MenuItem value="all">
          <span>All</span>
        </MenuItem>
        {CITIES.map((city) => (
          <MenuItem key={city} value={city.toLowerCase()}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

const FindCompanyButton = ({ handleFindCompanyClick }) => (
  <Button
    onClick={handleFindCompanyClick}
    sx={{
      marginTop: 2.5,
      color: "white",
      padding: "0 30px",
      fontWeight: "bold",
      textTransform: "capitalize",
      height: "40px",
    }}
    className="linear-bg w-fit"
  >
    Find Company
  </Button>
);

const AddCompanyButton = ({ handleOpen }) => (
  <Button
    onClick={handleOpen}
    className="linear-bg w-fit"
    sx={{
      m: 1,
      height: "40px",
      marginTop: 3.5,
      color: "white",
      padding: "0 30px",
      fontWeight: "bold",
      textTransform: "capitalize",
    }}
  >
    + Add Company
  </Button>
);

const SortSelector = ({ sortOption, handleSortChange }) => (
  <FormControl fullWidth sx={{ minWidth: "100px", marginBottom: 1 }}>
    <span className="text-gray-500">Sort</span>
    <Select
      labelId="sort-select-label"
      value={sortOption}
      onChange={handleSortChange}
      sx={{
        height: "40px",
        lineHeight: "40px",
      }}
    >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="rating">Rating</MenuItem>
      <MenuItem value="location">Location</MenuItem>
    </Select>
  </FormControl>
);

export default Main;
