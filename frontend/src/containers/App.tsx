import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Map from "./Map";
import Restaurant from "./Restaurant";

const HERE_API_KEY = "7mwd-ZQSD2gjH2pl3i25QpZgbR5wGy_tl7YOIrLurzU";

const App: React.FunctionComponent = () => (
  <Box>
    <CssBaseline />
    <Map apikey={HERE_API_KEY} />
    <Restaurant apikey={HERE_API_KEY} />
  </Box>
);

export default App;
