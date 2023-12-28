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

import LoadingContainer from "../common/LoadingContainer";
import { Restaurant } from "../../model/restaurant";
import restaurantIcon from "../../images/restaurant.webp";

interface Props {
  isLoading: boolean;
  restaurantList: Restaurant[];
  selectedRestaurant: Restaurant | null;
  handleClick: (restaurant: Restaurant | null) => void;
}

// It used to be a drawer :)
const RestaurantDrawer: React.FunctionComponent<Props> = ({
  isLoading = true,
  restaurantList,
  selectedRestaurant,
  handleClick,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      width: "30vw",
      maxWidth: 300,
      borderLeft: "1px solid rgba(0, 0, 0, 0.12)",

      position: "relative",
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflow: "hidden",
      },
    }}
  >
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: `url(${restaurantIcon}) center center no-repeat`,
        backgroundSize: "contain",
      }}
      onClick={() => handleClick(null)}
    />
    <Divider />
    <List sx={{ flexGrow: 1, overflow: "auto", position: "relative" }}>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        [...restaurantList]
          .sort((a, b) => a.distance - b.distance)
          .map((restaurant) => {
            const { name, distance, address } = restaurant;
            const isSelected = selectedRestaurant?.name === name;

            return (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  sx={{ display: "block" }}
                  selected={isSelected}
                  onClick={() => handleClick(restaurant)}
                >
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
                        <Typography
                          noWrap={!isSelected}
                          fontSize={12}
                          color={grey}
                        >
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
            );
          })
      )}
    </List>
  </Box>
);

export default RestaurantDrawer;
