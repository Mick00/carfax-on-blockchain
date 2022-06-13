import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Button } from "@mui/material";
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

  const [walletAddress, setWalletAddress] = useState('');

  useEffect(()=> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      window.ethereum.request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch(console.error);
    }
    else {
      console.log('MetaMask is not installed!');
    }
  
  }, []);

  // useEffect(() => {
  //   if (typeof window.ethereum !== 'undefined') {
  //     console.log('MetaMask is installed!');
  //     login()
  //   }
  //   else {
  //     console.log('MetaMask is not installed!');
  
  //   }
  
  //  }, []);

  const handleAccountsChanged = (accounts: string) => {
    console.log(accounts);

    if (accounts.length === 0) {
       console.log("you are not logged in ")
    } else if (accounts[0] !== walletAddress) {
        setWalletAddress(accounts[0]);
        console.log("this is the account " + accounts)
    }
  }
  
  const login = async () => {

    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      console.log(walletAddress);
    }
    else {
      alert("please install metamask")
      console.log('MetaMask is not installed!');
      setWalletAddress('');
    }

  }
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

        {walletAddress !== '' ?
        <Profile address={walletAddress}/>
        :
        <Button variant="contained" onClick={login} color="primary">
                Login
        </Button>
        }
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
