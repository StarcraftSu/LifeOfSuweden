import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

import { Restaurant } from "../../model/restaurant";
import restaurantIcon from "../../images/restaurant.webp";

interface Props {
  isLoading: boolean;
  restaurantList: Restaurant[];
}

const RestaurantDrawer: React.FunctionComponent<Props> = ({
  isLoading = true,
  restaurantList,
}) => (
  <Drawer
    sx={{
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: "30vw",
        maxWidth: 300,
        flexDirection: "column",
        overflow: "hidden",
      },
    }}
    variant="permanent"
    anchor="right"
  >
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: `url(${restaurantIcon}) center center no-repeat`,
        backgroundSize: "contain",
      }}
    />
    <Divider />
    <List sx={{ flexGrow: 1, overflow: "auto", position: "relative" }}>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        [...restaurantList]
          .sort((a, b) => a.distance - b.distance)
          .map(({ name, distance, address }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton sx={{ display: "block" }}>
                <ListItemText
                  primary={
                    <Typography
                      textAlign="left"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {name}
                    </Typography>
                  }
                />
                <Box display="flex" alignItems="center">
                  <ListItemText
                    primary={
                      <Typography noWrap fontSize={12} color={grey}>
                        {address}
                      </Typography>
                    }
                  />
                  <ListItemText
                    sx={{ flexShrink: 0, marginLeft: "1rem" }}
                    secondary={
                      <Typography
                        textAlign="right"
                        fontSize={10}
                        variant="body2"
                        color={grey}
                      >
                        {(distance / 1000).toFixed(2)} km
                      </Typography>
                    }
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))
      )}
    </List>
  </Drawer>
);

export default RestaurantDrawer;
