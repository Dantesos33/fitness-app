import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { Stack, useRouter } from "expo-router";

const initialForm = {
  name: "",
  type: "strength",
  muscle: "",
  equipment: "",
  difficulty: "beginner",
  instructions: "",
};

export default function AddExerciseScreen() {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    // Basic validation
    if (!form.name || !form.muscle || !form.equipment || !form.instructions) {
      Alert.alert("Missing info", "Please fill in all required fields.");
      return;
    }

    const filePath = FileSystem.documentDirectory + "user_exercises.json";

    try {
      // Ensure file exists
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify([]));
      }
      const content = await FileSystem.readAsStringAsync(filePath);
      const current = JSON.parse(content || "[]");

      // Prevent duplicates by name
      if (current.some((ex) => ex.name.toLowerCase() === form.name.toLowerCase())) {
        Alert.alert("Duplicate", "An exercise with this name already exists.");
        return;
      }

      const newList = [{
        name: form.name.trim(),
        type: form.type.trim(),
        muscle: form.muscle.trim(),
        equipment: form.equipment.trim(),
        difficulty: form.difficulty.trim(),
        instructions: form.instructions.trim(),
      }, ...current];

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newList));
      Alert.alert("Success", "Exercise added.");
      // Navigate back to exercise list
      router.replace("exercise");
    } catch (e) {
      Alert.alert("Error", "Could not save exercise.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: "Add Exercise", headerTitleAlign: "center" }} />

        <View style={styles.panel}>
          <Text style={styles.label}>Name *</Text>
          <TextInput value={form.name} onChangeText={(t) => setField("name", t)} style={styles.input} placeholder="e.g. Incline Hammer Curls" />

          <Text style={styles.label}>Type</Text>
          <TextInput value={form.type} onChangeText={(t) => setField("type", t)} style={styles.input} placeholder="e.g. strength" />

          <Text style={styles.label}>Muscle *</Text>
          <TextInput value={form.muscle} onChangeText={(t) => setField("muscle", t)} style={styles.input} placeholder="e.g. biceps" />

          <Text style={styles.label}>Equipment *</Text>
          <TextInput value={form.equipment} onChangeText={(t) => setField("equipment", t)} style={styles.input} placeholder="e.g. dumbbell" />

          <Text style={styles.label}>Difficulty</Text>
          <TextInput value={form.difficulty} onChangeText={(t) => setField("difficulty", t)} style={styles.input} placeholder="e.g. beginner" />

          <Text style={styles.label}>Instructions *</Text>
          <TextInput
            value={form.instructions}
            onChangeText={(t) => setField("instructions", t)}
            style={[styles.input, { height: 120 }]}
            multiline
            placeholder="Describe how to perform the exercise"
          />

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  panel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "dimgray",
  },
  input: {
    backgroundColor: "#f4f4f5",
    borderColor: "#e4e4e7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  submit: {
    marginTop: 10,
    backgroundColor: "rgb(244, 63, 94)",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});