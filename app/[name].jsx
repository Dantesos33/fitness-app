import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../assets/data/exercises.json";
import capitalizeFirstLetter from "../utils/helperFunctions";
import { Stack } from "expo-router";

const ExerciseDetailsScreen = () => {
  const { name } = useLocalSearchParams();
  const exercise = exercises.find((ex) => ex.name === name);

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: capitalizeFirstLetter(exercise.name),
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.panel}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          {capitalizeFirstLetter(exercise.muscle)} |{" "}
          {capitalizeFirstLetter(exercise.equipment)}
        </Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ExerciseDetailsScreen;
