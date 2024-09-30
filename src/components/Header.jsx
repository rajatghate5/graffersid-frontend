import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="static" sx={headerStyles}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Logo />
          <Box sx={{ display: "flex", gap: 4 }}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
            <AuthButtons />
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  );
};

// Header styles
const headerStyles = {
  boxShadow: "none",
  background: "white",
  color: "black",
  padding: "0 60px",
};

const Logo = () => (
  <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
    <img src="/logo.png" alt="Logo" />
    <span className="tracking-wide ml-2">Review</span>
    <span className="linear-bg-text">&</span>
    <span className="font-bold uppercase tracking-wide">Rate</span>
  </Typography>
);

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => (
  <Box sx={{ flexGrow: 1, textAlign: "center", ml: "auto", mr: 2 }}>
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ width: 400, marginRight: 1 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

const AuthButtons = () => (
  <>
    <Button color="inherit">Login</Button>
    <Button color="inherit">Sign Up</Button>
  </>
);

const Divider = () => (
  <Box
    sx={{
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      height: "10px",
      background: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  />
);

export default Header;
