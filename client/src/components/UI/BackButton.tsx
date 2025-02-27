import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ToggleStyle } from "../../styles";

interface BackButtonProps {
  toggleStyle: ToggleStyle;
}

export const BackButton: React.FC<BackButtonProps> = ({ toggleStyle }) => {
  return (
    <Link to="..">
      <IconButton
        sx={{
          backgroundColor: toggleStyle.backgroundColor,
          color: toggleStyle.iconColor,
          marginBottom: "30px",
          "&:hover": {
            backgroundColor: toggleStyle.backgroundColor,
            transform: "scale(1.1)",
            transition: "0.2s",
          },
        }}
      >
        <BiArrowBack style={{ color: toggleStyle.iconColor }} />
      </IconButton>
    </Link>
  );
};
