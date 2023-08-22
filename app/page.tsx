import styles from "../styles/page.module.css";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import GridContainer from "../components/GridContainer";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Provide consistent theming for child components */}
      <ThemeProvider theme={theme}>
        <div className={styles.grid}>
          {/* NFT Container displays the grid of NFTs */}
          <GridContainer />
        </div>
      </ThemeProvider>
    </main>
  );
}
