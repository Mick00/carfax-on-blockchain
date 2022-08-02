import React from "react";
import { Box, Button, IconButton, Link, Menu, MenuItem, Stack } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const PLACEHOLDER = "{CID}"

const gatewaysList = [
  {
    label: "ipfs.io",
    url: `https://ipfs.io/ipfs/${PLACEHOLDER}`
  }, {
    label: "dweb.link",
    url: `https://${PLACEHOLDER}.ipfs.dweb.link`
  }
]

interface IPFSFileProp extends React.PropsWithChildren{
  hash: string,
  clickable?: (handleClick: (event: any) => void) => React.ReactNode
}

export default function IPFSFile(props: IPFSFileProp){

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={"row"} sx={{"display": "inline"}}>
      {props.clickable && (props.clickable(handleClick))}
      {!props.clickable && (
        <>
          {props.children}
          <IconButton size={"small"} onClick={handleClick}><VisibilityIcon/></IconButton>
        </>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {gatewaysList.map((gateway) =>(
          <MenuItem>
            <Link
              href={gateway.url.replaceAll(PLACEHOLDER, props.hash)}
              target={"_blank"}
              rel={"nofollow noopener noreferrer"}
            >
              {gateway.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}
