interface Coordinate {
  lat: number;
  lng: number;
}

interface RestaurantJson {
  id: string;
  title: string;
  address?: {
    label: string;
  };
  distance?: number;
  position?: Coordinate;
}
