import { View, Text, StyleSheet } from "react-native";

const ExerciseListItem = ({ item }) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Text style={styles.exerciseSubtitle}>
      {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderRadius: 10,
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
