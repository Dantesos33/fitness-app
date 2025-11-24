import { Pressable, Text, StyleSheet } from "react-native";
import capitalizeFirstLetter from "../utils/helperFunctions";
import { Link } from "expo-router";

const ExerciseListItem = ({ item }) => (
  <Link href={`/${item.name}`} asChild>
  <Pressable style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Text style={styles.exerciseSubtitle}>
      {capitalizeFirstLetter(item.muscle)} | {capitalizeFirstLetter(item.equipment)}
    </Text>
  </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginHorizontal: 2,

    //Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1  },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
});

export default ExerciseListItem;
