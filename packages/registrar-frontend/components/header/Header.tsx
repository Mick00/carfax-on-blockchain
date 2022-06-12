import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
// Dropdown Component
import Search from "./Search";
import Profile from "./Profile";

export interface IHeaderProps {
    sx?: object;
    customClass?: string;
    position?: any;
    toggleSidebar?: any;
    toggleMobileSidebar?: any;
}

const Header = (props: IHeaderProps): JSX.Element => {
  return (
    <AppBar sx={props.sx} position={props.position} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <MenuIcon width="20" height="20" />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search/>
        {/* ------------ End Menu icon ------------- */}

        <Box flexGrow={1} />

        <Profile/>
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
