"use client";
import React from "react";
import useSWR from "swr";
import { FixedSizeList } from "react-window";
import { Grid, Typography } from "@mui/material";
import { CardDisplay, heightCard, widthIm } from "./CardDisplay";
import { RenderSkeleton } from "./RenderSkeleton";

export type TNFTs = {
  title: string;
  img: string;
  price: number;
};

export const MARGIN_OFFSET = 20;
const NB_NFTS_PER_FETCH = 20;
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

interface NFTListProps {
  searchTerm: string;
  colNb: number;
}

// Virtualized Grid of NFTs
export const VirtualizedNFTGrid = ({ searchTerm, colNb }: NFTListProps) => {
  const [paginationOffset, setPaginationOffset] = React.useState(0);
  const fusedDataRef = React.useRef<TNFTs[]>([]);

  const handleScroll = () => {
    const listContainer = document.querySelector(".fixed-size-list-container");
    if (listContainer === null) return;
    const scrollHeight = listContainer.scrollHeight;
    const scrollTop = listContainer.scrollTop;
    const listHeight = listContainer.clientHeight;
    // When we reach NEAR the bottom of the list, fetch more data
    if (
      scrollTop + listHeight >=
      scrollHeight - scrollTop / NB_NFTS_PER_FETCH
    ) {
      React.startTransition(() => {
        setPaginationOffset(fusedDataRef.current.length + NB_NFTS_PER_FETCH);
        // don't use (prev) => prev+ ... has it can jump and offset when scrolling fast
      });
    }
  };

  // NFT Fetching and data handling
  const { data, error, isLoading } = useSWR(
    `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=${paginationOffset}`,
    fetcher
  );
  let firstLoading = false;
  if (fusedDataRef.current.length === 0 && isLoading) {
    firstLoading = true;
  }
  if (!(error || isLoading)) {
    // We had new data to our existing one.
    fusedDataRef.current.push(...data.results);
  }

  // Filter NFTs by search term
  const filteredNFTs = fusedDataRef.current.filter((NFT: { title: string }) =>
    NFT.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tell of many Card per row should be displayed
  const nbColumnKeys = Array.from(Array(colNb).keys());

  return (
    <>
      {error && (
        <Typography color="error">
          Oops! We couldn&apos;t load the NFTs. Please try again in a moment.
        </Typography>
      )}
      <FixedSizeList
        className="fixed-size-list-container"
        key={searchTerm}
        height={(heightCard + MARGIN_OFFSET) * 2}
        width={(widthIm + MARGIN_OFFSET) * colNb}
        itemSize={heightCard + MARGIN_OFFSET}
        itemCount={
          // Add item for skeletons while waiting for new data
          isLoading
            ? Math.max(
                Math.ceil((NB_NFTS_PER_FETCH + colNb) / colNb),
                Math.ceil(paginationOffset / colNb)
              )
            : Math.ceil(filteredNFTs.length / colNb)
        }
        overscanCount={2}
        onScroll={handleScroll}
      >
        {renderVirtualizedNFTRow(
          isLoading,
          firstLoading,
          filteredNFTs,
          nbColumnKeys
        )}
      </FixedSizeList>
    </>
  );
};

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const renderVirtualizedNFTRow = (
  isLoading: boolean,
  firstLoading: boolean,
  filteredNFTs: TNFTs[],
  nbColumnKeys: number[]
) => {
  return function virtualizerProps({ index, style }: RowProps) {
    // If no NFts yet, display skeletons
    if (firstLoading) {
      return <RenderSkeleton nbColumnKeys={nbColumnKeys} style={style} />;
    }

    // Display nfts card, and skeletons if loading more nfts
    const startIndex = index * nbColumnKeys.length;
    return (
      <>
        <Grid key={startIndex} container style={style}>
          {nbColumnKeys.map((nbColumnKeys) => {
            const currNFT = filteredNFTs[startIndex + nbColumnKeys];
            if (!currNFT) return <Grid item key={nbColumnKeys} xs={3} />;

            return (
              <Grid key={nbColumnKeys} item xs={12} sm={6} md={4} lg={3}>
                <CardDisplay currNFT={currNFT} />
              </Grid>
            );
          })}
        </Grid>
        {isLoading && (
          <RenderSkeleton nbColumnKeys={nbColumnKeys} style={style} />
        )}
      </>
    );
  };
};
