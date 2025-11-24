import { View, Text, StyleSheet } from "react-native";
import capitalizeFirstLetter from "../utils/helperFunctions";

const ExerciseListItem = ({ item }) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Text style={styles.exerciseSubtitle}>
      {capitalizeFirstLetter(item.muscle)} | {capitalizeFirstLetter(item.equipment)}
    </Text>
  </View>
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
