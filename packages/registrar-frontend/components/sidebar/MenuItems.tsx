import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SearchIcon from '@mui/icons-material/Search';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Menuitems = [
    {
      title: "Dashbaord",
      icon: <HomeIcon width="20" height="20" style={{color:'#000000'}}/>,
      href: "/",
    },
    {
      title: "Report",
      icon: <SummarizeIcon width="20" height="20" style={{color:'#000000'}}/>,
      href: "/report",
    },
    {
      title: "Search",
      icon: <SearchIcon width="20" height="20" style={{color:'#000000'}}/>,
      href: "/search",
    },
    {
      title: 'Register',
      icon: <AppRegistrationIcon width="20" height="20" style={{color:'#000000'}}/>,
      href: "/register"
    }
  ];
  
  export default Menuitems;
  