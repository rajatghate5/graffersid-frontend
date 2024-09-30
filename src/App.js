import React, { useState } from "react";
import Header from "./components/Header";
import AddCompany from "./components/AddCompany";
import Main from "./components/Main";
import "./App.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Main handleOpen={handleOpen} searchTerm={searchTerm} />
      <AddCompany open={open} handleClose={handleClose} />
    </>
  );
};

export default App;
