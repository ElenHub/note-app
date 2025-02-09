import {
  MdCalendarMonth,
  MdDarkMode,
  MdFeedback,
  MdLightMode,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LogoutButton from "../LogoutButton/LogoutButton";
import { BiLogOut } from "react-icons/bi";

interface HeaderProps {
  toggleStyle: {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
  };
  handleToggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: props.toggleStyle.backgroundColor,
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {/* AppBar for the header with custom styling */}
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: props.toggleStyle.textColor }}
        >
          Notes
        </Typography>
        <Link to="/calendar" style={{ textDecoration: "none" }}>
          {/* Link to the calendar page */}
          <IconButton
            sx={{
              color: props.toggleStyle.iconColor,
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            <MdCalendarMonth />
          </IconButton>
        </Link>
        <Link to="/feedbacks" style={{ textDecoration: "none" }}>
          {/* Link to the feedbacks page */}
          <IconButton
            sx={{
              color: props.toggleStyle.iconColor,
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            <MdFeedback />
          </IconButton>
        </Link>
        <IconButton
          sx={{
            color: props.toggleStyle.iconColor,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s",
            },
          }}
          onClick={props.handleToggleDarkMode}
        >
          {/* Button to toggle dark mode */}
          {props.darkMode ? <MdLightMode /> : <MdDarkMode />}
        </IconButton>
        <IconButton
          sx={{
            color: props.toggleStyle.iconColor,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s",
            },
          }}
        >
          <LogoutButton />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
