import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import exercises from "../assets/data/exercises.json";
import ExerciseListItem from "../components/ExerciseListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function ExerciseScreen() {
  const router = useRouter();
  const [mergedExercises, setMergedExercises] = useState(exercises);

  const loadUserExercises = useCallback(async () => {
    try {
      const filePath = FileSystem.documentDirectory + "user_exercises.json";
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify([]));
        setMergedExercises(exercises);
        return;
      }
      const content = await FileSystem.readAsStringAsync(filePath);
      const userExercises = JSON.parse(content || "[]");
      setMergedExercises([...userExercises, ...exercises]);
    } catch (e) {
      setMergedExercises(exercises);
    }
  }, []);

  useEffect(() => {
    loadUserExercises();
  }, [loadUserExercises]);

  useFocusEffect(
    useCallback(() => {
      loadUserExercises();
      return () => {};
    }, [loadUserExercises])
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mergedExercises}
        contentContainerStyle={{ gap: 8, paddingBottom: 80 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        // Removed two-column grid
        // numColumns={2}
        // columnWrapperStyle={{ gap: 8 }}
      />
      <TouchableOpacity
        onPress={() => router.push("add-exercise")}
        style={styles.fab}
        accessibilityLabel="Add Exercise"
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    padding: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "rgb(244, 63, 94)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  fabText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 28,
  },
});
