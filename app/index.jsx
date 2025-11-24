import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet } from "react-native";
import exercises from "../assets/data/exercises.json";
import ExerciseListItem from "../components/ExerciseListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

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
  }
});
