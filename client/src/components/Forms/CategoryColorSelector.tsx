import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Button, FormControl, MenuItem, Popover, Select } from "@mui/material";

// Define categories with their names and colors
export const categories = {
  work: { name: "Job", color: "#56B5A0" },
  personal: { name: "Personal", color: "#DED16F" },
  shopping: { name: "Purchases", color: "#73BAE0" },
  urgent: { name: "Urgently", color: "#E37173" },
};

// Component for selecting a category and its associated color
const CategoryColorSelector = ({
  category = "",
  setColor,
  setCategory,
  setFontColor,
  fontColor,
  isEditMode,
  toggleStyle,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to open the color picker popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Determine if popover should be open
  const id = open ? "simple-popover" : undefined; // ID for the popover

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (categories[selectedCategory]) {
      setColor(categories[selectedCategory].color);
    } else if (selectedCategory !== "") {
      console.error("Selected category does not exist:", selectedCategory);
      setCategory("");
      setColor("");
    }
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <Select
          sx={{ borderRadius: "30px", backgroundColor: "var(--orange-color)" }}
          labelId="category-select-label"
          value={category || ""}
          onChange={handleCategoryChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected && categories[selected]) {
              return categories[selected].name;
            }
            return isEditMode ? "Change category" : "Select category";
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.keys(categories).map((key) => (
            <MenuItem
              key={key}
              value={key}
              style={{ color: categories[key].color }}
            >
              {categories[key].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ marginTop: "20px" }}>
        <Button
          sx={{
            borderRadius: "30px",
            backgroundColor: "var(--orange-color)",
            color: "var(--black-color)",
          }}
          variant="contained"
          onClick={handleClick}
        >
          Select Color
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <SketchPicker
            color={fontColor}
            onChangeComplete={(color) => setFontColor(color.hex)}
          />
        </Popover>
      </div>
    </div>
  );
};

export default CategoryColorSelector;
