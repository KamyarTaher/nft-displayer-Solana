"use client";
import React from "react";
import { Card, Grid, Skeleton } from "@mui/material";
import { cardSX, heightIm, widthIm } from "./CardDisplay";
import { MARGIN_OFFSET } from "./VirtualizedNFTGrid";

interface SkeletonProps {
  nbColumnKeys: number[];
  style: React.CSSProperties;
}
const SkeletonComponent = ({ nbColumnKeys, style }: SkeletonProps) => {
  return (
    <Grid container style={style}>
      {nbColumnKeys.map((nbColumnKeys) => {
        return (
          <Grid key={nbColumnKeys} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={cardSX}>
              <Skeleton
                variant="rectangular"
                width={widthIm}
                height={heightIm}
                sx={{ borderRadius: "4px" }}
              />

              <Skeleton
                variant="rectangular"
                width={widthIm - MARGIN_OFFSET}
                height={MARGIN_OFFSET}
                sx={{ borderRadius: "4px", margin: "10px" }}
              />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
export const RenderSkeleton = React.memo(SkeletonComponent);
RenderSkeleton.displayName = "RenderSkeleton";
