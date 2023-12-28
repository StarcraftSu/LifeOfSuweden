import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

const LoadingContainer: React.FunctionComponent<Props> = ({ children, sx }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default LoadingContainer;
