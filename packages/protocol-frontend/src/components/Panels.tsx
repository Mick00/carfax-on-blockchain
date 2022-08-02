import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export interface IPanelsProps {
  panes: {label: string, component: React.ReactNode, hide?: boolean}[]
}

export default function Panels(props: IPanelsProps) {
  const {panes} = props;
  const [tab, setTab] = useState(0);
  const browsableTab = panes.filter(pane => !pane.hide)

  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(event, value) => setTab(value)} aria-label="basic tabs example">
          {browsableTab.map((pane, i) => pane.hide?null:(<Tab label={pane.label} {...a11yProps(i)} key={i}/>))}
        </Tabs>
      </Box>
      {browsableTab.map((pane, i) => (
        <TabPanel value={tab} index={i} key={i}>
          {pane.component}
        </TabPanel>
      ))}
    </Box>
  )
}
