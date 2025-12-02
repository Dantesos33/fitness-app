import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../assets/data/exercises.json";
import * as FileSystem from "expo-file-system/legacy";
import capitalizeFirstLetter from "../utils/helperFunctions";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ExerciseDetailsScreen = () => {
  const { name } = useLocalSearchParams();
  const [exercise, setExercise] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadExercise = async () => {
      // Search in user file first, then fallback to built-in
      try {
        const filePath = FileSystem.documentDirectory + "user_exercises.json";
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          const content = await FileSystem.readAsStringAsync(filePath);
          const userExercises = JSON.parse(content || "[]");
          const foundUser = userExercises.find((ex) => ex.name === name);
          if (foundUser) {
            setExercise(foundUser);
            return;
          }
        }
      } catch {}
      const builtIn = exercises.find((ex) => ex.name === name);
      setExercise(builtIn || null);
    };
    loadExercise();
  }, [name]);

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
