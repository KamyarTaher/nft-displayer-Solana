"use client";
import React from "react";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MARGIN_OFFSET, VirtualizedNFTGrid } from "./VirtualizedNFTGrid";
import { heightCard, widthIm } from "./CardDisplay";
import { colorPrimaryLight } from "@/styles/theme";

const DEFAULT_COLUMN_NB = 4;
const CARD_EXTRA_HEIGHT = 70;
const CONTAINER_PADDING = 60;

// Responsive Box containing TextField and VirtualizedNFTGrid
export const GridContainer = () => {
  const theme = useTheme();

  // Column number handling for Box and grid responsiveness
  const [colNb, setColNb] = React.useState(DEFAULT_COLUMN_NB);
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // 1 column
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 2 columns
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 3 columns
  const isLg = useMediaQuery(theme.breakpoints.only("lg")); // 4 columns
  React.useEffect(() => {
    // Stay at default if larger than lg
    let activeColumn = DEFAULT_COLUMN_NB;
    if (isXs) activeColumn = 1;
    else if (isSm) activeColumn = 2;
    else if (isMd) activeColumn = 3;
    else if (isLg) activeColumn = 4;
    setColNb(activeColumn);
  }, [isXs, isSm, isMd, isLg]);

  // Search bar handling
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    React.startTransition(() => {
      setSearchTerm(event.target.value);
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"top"}
      borderRadius={"4px"}
      height={(heightCard + CARD_EXTRA_HEIGHT) * 2}
      width={(widthIm + MARGIN_OFFSET) * colNb + CONTAINER_PADDING}
      maxHeight={"100%"}
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        size="small"
        placeholder="Search nft name"
        inputProps={{
          style: {
            borderRadius: "4px",
            border: `1px solid ${colorPrimaryLight}`,
          },
        }}
        sx={{ my: "1rem" }}
      />
      <VirtualizedNFTGrid searchTerm={searchTerm} colNb={colNb} />
    </Box>
  );
};

export default GridContainer;
