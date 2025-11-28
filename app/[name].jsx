import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../assets/data/exercises.json";
import capitalizeFirstLetter from "../utils/helperFunctions";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ExerciseDetailsScreen = () => {
  const { name } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const exercise = exercises.find((ex) => ex.name === name);

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  return (
    <SafeAreaView>
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
        <Text style={styles.instructions} numberOfLines={isExpanded ? 0 : 3}>{exercise.instructions}</Text>
        <Text onPress={() => setIsExpanded(!isExpanded)} style={styles.seeMore}>{isExpanded ? 'See less': 'See more'}</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
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
  seeMore: {
    alignSelf: "center",
    padding: 10,
    color: "gray",
    fontWeight: "600",
  }
});

export default ExerciseDetailsScreen;
