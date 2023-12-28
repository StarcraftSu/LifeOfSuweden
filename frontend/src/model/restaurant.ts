export interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: number;
  position: Coordinate;
}

const createRestaurant = (): Restaurant => ({
  id: "",
  name: "",
  address: "",
  distance: 0,
  position: {
    lat: 0,
    lng: 0,
  },
});

export const convertJsonToRestaurant = (json: RestaurantJson) => {
  const newRestaurant = createRestaurant();

  newRestaurant.id = json.id;
  newRestaurant.name = json.title;
  newRestaurant.address =
    json.address?.label.split(",").slice(1).join("") || "Sorry, address is not available";
  newRestaurant.distance = json.distance || 0;
  newRestaurant.position = json.position || newRestaurant.position;

  return newRestaurant;
};
