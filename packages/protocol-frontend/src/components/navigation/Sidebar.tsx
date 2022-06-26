import { Box, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import React from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

interface SidebarLink {
    label: string,
    destination: string,
    icon?: () => any
}

export const menuItems: SidebarLink[] = [
    {
        label: "Reports",
        destination: "/",
        icon: () => (
            <ListItemIcon>
                <InsertDriveFileIcon />
            </ListItemIcon>)
    },
    {
      label: "Contributors",
      destination: "/contributors",
      icon: () => (
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>)
    },
  {
    label: "Cars",
    destination: "/cars",
    icon: () => (
      <ListItemIcon>
        <TimeToLeaveIcon />
      </ListItemIcon>)
  },
  {
    label: "Registrars",
    destination: "/registrars",
    icon: () => (
      <ListItemIcon>
        <VerifiedUserIcon />
      </ListItemIcon>)
  },
]

function Sidebar() {
  const navigate = useNavigate();
    return (
        <Box>
            <List>
                {menuItems.map((link) => (
                    <ListItem disablePadding key={link.destination}>
                        <ListItemButton onClick={()=> navigate(link.destination)}>
                            {link.icon? link.icon(): null}
                            <ListItemText>
                              <Link component={ReactRouterLink} to={link.destination}>
                                {link.label}
                              </Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Sidebar;
