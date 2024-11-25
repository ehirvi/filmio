import { Text } from "react-native";
import { Actor } from "../utils/types";

interface Props {
  actor: Actor;
}

const ActorListItem = ({ actor }: Props) => {
  return <Text>{actor.name}</Text>;
};

export default ActorListItem;
