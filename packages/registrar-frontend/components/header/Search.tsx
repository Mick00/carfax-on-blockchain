import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { IconButton, Input, Box, Drawer } from "@mui/material";

const Search = () => {
  // drawer top
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };
  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer(true)}
        size="large"
      >
        <SearchIcon width="20" height="20" />
      </IconButton>
      <Drawer
        anchor="top"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            padding: "15px 30px",
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <Input placeholder="Search here" aria-label="description" fullWidth />
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={handleDrawerClose}
            >
              <SearchOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Search;
