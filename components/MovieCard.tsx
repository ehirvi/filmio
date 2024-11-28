import {
  Card,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { LARGE_POSTER_URL } from "../utils/constants";
import { Movie } from "../utils/types";
import { parseReleaseYear } from "../utils/helpers";
import { useMemo, useState } from "react";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const releaseYear = useMemo(
    () => parseReleaseYear(movie.release_date),
    [movie.id]
  );
  const theme = useTheme();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <View>
      {modalOpen && (
        <Portal>
          <Modal
            contentContainerStyle={{ margin: 50 }}
            visible={modalOpen}
            onDismiss={closeModal}
          >
            <Surface
              style={{
                ...styles.modalContent,
                backgroundColor: theme.colors.surface,
              }}
              elevation={4}
            >
              <Text variant="bodyLarge">
                {movie.title} ({releaseYear})
              </Text>
              <Text variant="bodyMedium">{movie.overview}</Text>
            </Surface>
          </Modal>
        </Portal>
      )}
      <Pressable onPress={openModal}>
        <Card
          elevation={3}
          style={{ ...styles.card, backgroundColor: theme.colors.surface }}
        >
          <Card.Content>
            <Surface elevation={2}>
              <Image
                source={{ uri: `${LARGE_POSTER_URL}/${movie.poster_path}` }}
                style={styles.image}
              />
            </Surface>
          </Card.Content>
          <Card.Title title={`${movie.title} (${releaseYear})`} />
        </Card>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 30,
    marginHorizontal: "auto",
  },
  image: {
    width: 270,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  modalContent: {
    padding: 50,
    borderRadius: 10,
    gap: 10,
  },
});

export default MovieCard;
