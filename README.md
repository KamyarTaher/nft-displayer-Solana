# MagicEden Challenge, NFT Viewer

## Running the Project

1. **Navigate to the project directory**

```bash
cd me-challenge-KAMYAR-TAHER
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm run dev
```

After running the above command, open your browser and navigate to `http://localhost:3000` to view the application.

## App Structure & Features

### **page.tsx**

- This is the main landing page of the app.
- The `ThemeProvider` ensures a consistent theming for MUI components. The theme details are imported from the `styles/theme`.
- The core content of this page is the `GridContainer`, responsible for rendering a grid of NFTs.

### **GridContainer.tsx**

- This is a responsive container that hosts a search bar and a virtualized grid of NFTs.
- The grid's column count is determined based on the screen size, with specific column counts set for different breakpoints.
- A search bar lets users filter NFTs by name.
- It calls next the `VirtualizedNFTGrid`.

### **VirtualizedNFTGrid.tsx**

- This component is at the heart of the app's performance, implementing a virtualized grid for displaying NFTs.
- It fetches NFT data from the "Magic Eden" mainnet using useSWR and keeps loading more as the user scrolls.
- SWR has a built-in retry on api failure, using exponential backoff algorithm.
- If there's an error during fetching, it displays an error message.
- Filtering by the search term is also implemented in this component.
- It calls next the `CardDisplay` and/or `RenderSkeleton` depending on the loading state.

### **RenderSkeleton.tsx**

- This component displays a skeleton loader, which is a placeholder UI for content that's loading.
- It enhances the perceived performance by showing users a preview of the content before it loads.

### **CardDisplay.tsx**

- This component is responsible for displaying a single NFT card.
- It showcases the NFT image, title, and price (formatted to two decimal places).

## Pros

1. **Performance**: Using a virtualized grid significantly enhances performance when dealing with large lists of data. It ensures that only visible components are rendered.
2. **Responsive Design**: The app adjusts its layout based on different screen sizes, making it user-friendly across devices.
3. **Consistent Theming**: Using `ThemeProvider` ensures that theming remains consistent, which aids in maintaining a cohesive design throughout the app.
4. **Enhanced User Experience**: Skeleton loaders improve perceived performance, ensuring users aren't staring at a blank screen while content is being loaded.

## Cons

1. **Complexity**: The combination of virtualization and responsive design can introduce complexity to the code, which might make maintenance or extensions a bit challenging.
2. **Dependency on External API**: The app relies on an external API for data. Any changes or downtimes with this API can impact the app's functionality.
3. **CSR and SSR**: More parts of the app might benefit from Next.js's capabilities, specifically using Server Side Rendering (SSR) for improved SEO and faster initial page loads. Currently, there is no server side initial data fetching using `getServerSideProps`.
