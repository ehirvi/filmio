import { Card } from "react-native-paper";
import { MoviesFilteredByGenre } from "../utils/types";
import { Text } from "react-native";

interface Props {
  movie: MoviesFilteredByGenre["results"][number];
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card>
      <Card.Content>
        <Text>{movie.title}</Text>
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
