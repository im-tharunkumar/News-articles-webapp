import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ data, value,onChange,selectedVarient,varientOptions,handleVarientChange  }) => {


  return (
    <>
      {/* --- Header --- */}
      <AppBar position="static" sx={{background:"#f9f9f9", color:"black"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left side: Company Name */}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
           செய்தி மையம்
          </Typography>

          {/* Center: Navigation links */}
          {/* <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {["FAQ", "Support", "Events", "Blog", "Research", "Login"].map(
              (link) => (
                <Button
                  key={link}
                  color="inherit"
                  href={`#${link.toLowerCase()}`}
                  sx={{ textTransform: "none" }}
                >
                  {link}
                </Button>
              )
            )}
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "primary.main",
                },
              }}
            >
              Register
            </Button>
          </Box> */}


          <div style={{display:"flex", marginTop:"5px"}}>
          <FormControl >
        <InputLabel id="demo-simple-select-label">Combinations</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedVarient}
          label="Combinations"
          sx={{borderRadius:"30px", height:"50px", width:"300px",background:"white"}}
          onChange={(event) => handleVarientChange(event)}
        >
          {varientOptions.map((option) => (
            <MenuItem value={option.value}>{option.lable}</MenuItem>
          ))}

        </Select>
      </FormControl>

          {/* Right side: Search bar */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "300px",
              height:"44px",
              ml: 2,
              border:"1px solid lightgrey",
              boxShadow:"none",
              borderRadius:"30px",
            }}
            elevation={2}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              value={value}
              onChange={(e)=> onChange(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          </div>

        </Toolbar>
      </AppBar>

    </>
  );
};

export default Header;
