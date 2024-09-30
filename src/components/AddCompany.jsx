import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addCompany } from "../actions/companyActions";
import { CITIES } from "../constants";

const AddCompany = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [foundedOn, setFoundedOn] = useState("");
  const [city, setCity] = useState(CITIES[0] || "");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addCompany({ name, location, foundedOn, city: city.toLowerCase() })
    );
    handleClose();
  };

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
              className="mb-8 capitalize text-center font-bold w-full"
            >
              Add Company
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
            <InputField
              label="Company Name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputField
              label="Address"
              placeholder="Enter Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <InputField
              label="Founded on"
              type="date"
              value={foundedOn}
              onChange={(e) => setFoundedOn(e.target.value)}
              required
            />
            <CitySelectField city={city} setCity={setCity} />

            <Button
              type="submit"
              variant="contained"
              className="mt-4 w-fit self-center linear-bg"
              sx={{textTransform : "capitalize"}}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

const InputField = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-500 text-sm">{label}</label>
    <TextField fullWidth variant="outlined" {...props} />
  </div>
);

const CitySelectField = ({ city, setCity }) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-500 text-sm">City</label>
    <FormControl fullWidth required variant="outlined">
      <Select value={city} onChange={(e) => setCity(e.target.value)}>
        {CITIES.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default AddCompany;
