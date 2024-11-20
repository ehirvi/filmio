import { Card, Modal, Portal, Surface } from "react-native-paper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { POSTER_URL } from "../utils/constants";
import { DiscoverMovieResponse } from "../utils/types";
import { parseReleaseYear } from "../utils/helpers";
import { useMemo, useState } from "react";

interface Props {
  movie: DiscoverMovieResponse["results"][number];
}

const MovieCard = ({ movie }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const releaseYear = useMemo(
    () => parseReleaseYear(movie.release_date),
    [movie.id]
  );

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
            <Surface style={styles.modalContent} elevation={5}>
              <Text>{movie.overview}</Text>
            </Surface>
          </Modal>
        </Portal>
      )}
      <Pressable onPress={openModal}>
        <Card style={styles.card}>
          <Card.Content>
            <Surface elevation={3}>
              <Image
                source={{ uri: `${POSTER_URL}/${movie.poster_path}` }}
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
    padding: 5,
  },
  image: {
    width: 270,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  modalContent: {
    padding: 50,
    borderRadius: 10,
  },
});

export default MovieCard;
