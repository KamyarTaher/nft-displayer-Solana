import * as React from "react";
import {
  Box,
  Typography,
  CardActionArea,
  CardActions,
  Grid,
  Card,
} from "@mui/material";
import Image from "next/image";
import SolanaSVG from "../public/solana.svg";
import { TNFTs } from "./VirtualizedNFTGrid";
import { colorPrimaryMain } from "../styles/theme";

export const widthIm = 200;
export const heightIm = 200;
export const heightCard = heightIm + 40;

export const cardSX = {
  width: widthIm,
  height: heightCard,
  border: `1px solid ${colorPrimaryMain}`,
};

export function CardDisplay({ currNFT }: { currNFT: TNFTs }) {
  // Show price only up to 2 decimal places
  const NFTPrice = currNFT.price.toFixed(2).replace(/\.?0+$/, "");
  return (
    <Card sx={cardSX}>
      <CardActionArea>
        <Image
          src={currNFT.img}
          alt={currNFT.title}
          width={widthIm}
          height={heightIm}
          priority={true}
        />
      </CardActionArea>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="top"
          wrap="nowrap"
        >
          <Typography variant="body2" color="text.secondary">
            {currNFT.title}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Image priority src={SolanaSVG} alt={"solana price"} />
            <Typography variant="body2" color="text.secondary">
              {NFTPrice}
            </Typography>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
}
