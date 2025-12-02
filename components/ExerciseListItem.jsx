import { Pressable, Text, StyleSheet, ImageBackground } from "react-native";
import capitalizeFirstLetter from "../utils/helperFunctions";
import { Link } from "expo-router";

// Map normalized muscle keys to local images
const muscleImageMap = {
  chest: require("../assets/images/chest.png"),
  shoulders: require("../assets/images/shoulders.png"),
  upperarms: require("../assets/images/upperArms.png"),
  lowerarms: require("../assets/images/lowerArms.png"),
  upperlegs: require("../assets/images/upperLegs.png"),
  lowerlegs: require("../assets/images/lowerLegs.png"),
  waist: require("../assets/images/waist.png"),
  neck: require("../assets/images/neck.png"),
  back: require("../assets/images/back.png"),
  cardio: require("../assets/images/cardio.png"),
};

// Equipment-based images for variety
const equipmentImageMap = {
  barbell: require("../assets/images/slide1.png"),
  dumbbell: require("../assets/images/slide2.png"),
  ezcurlbar: require("../assets/images/slide3.png"),
  none: require("../assets/images/slide4.png"),
};

const slideImages = [
  require("../assets/images/slide1.png"),
  require("../assets/images/slide2.png"),
  require("../assets/images/slide3.png"),
  require("../assets/images/slide4.png"),
  require("../assets/images/slide5.png"),
];

function pickFallbackByName(name = "") {
  const str = String(name);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const idx = hash % slideImages.length;
  return slideImages[idx];
}

// Map common muscle names (normalized) to our image keys
const muscleSynonyms = {
  chest: "chest",
  pectorals: "chest",
  pecs: "chest",
  shoulders: "shoulders",
  delts: "shoulders",
  deltoids: "shoulders",
  upperarms: "upperarms",
  biceps: "upperarms",
  triceps: "upperarms",
  lowerarms: "lowerarms",
  forearms: "lowerarms",
  upperlegs: "upperlegs",
  quadriceps: "upperlegs",
  quads: "upperlegs",
  hamstrings: "upperlegs",
  glutes: "upperlegs",
  lowerlegs: "lowerlegs",
  calves: "lowerlegs",
  waist: "waist",
  abs: "waist",
  core: "waist",
  neck: "neck",
  back: "back",
  lats: "back",
  cardio: "cardio",
};

const ExerciseListItem = ({ item }) => {
  const rawMuscle = (item?.muscle || "").toLowerCase();
  const normalizedMuscle = rawMuscle.replace(/\s+/g, "");
  const targetMuscleKey = muscleSynonyms[normalizedMuscle] || normalizedMuscle;

  const rawEquipment = (item?.equipment || "").toLowerCase();
  const normalizedEquipment = rawEquipment.replace(/[^a-z]/g, ""); // e.g. e-z_curl_bar -> ezcurlbar

  // Prefer equipment image (for variety), then muscle image, then deterministic slide fallback
  const imageSource =
    equipmentImageMap[normalizedEquipment] ||
    muscleImageMap[targetMuscleKey] ||
    pickFallbackByName(item?.name);

  return (
    <Link href={`/${item.name}`} asChild>
      <Pressable style={styles.card} accessibilityLabel={`Open ${item.name} details`}>
        <ImageBackground source={imageSource} style={styles.image} imageStyle={styles.imageRadius}>
          <Text style={styles.overlayName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </ImageBackground>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {capitalizeFirstLetter(item.muscle)} | {capitalizeFirstLetter(item.equipment)}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginHorizontal: 2,
    // flex: 1, // single column, card takes full width
    height: 200,
    overflow: "hidden",

    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    height: 140,
    borderRadius: 10,
    justifyContent: "flex-end",
    padding: 10,
  },
  imageRadius: {
    borderRadius: 10,
  },
  overlayName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subtitle: {
    color: "dimgray",
  },
});

export default ExerciseListItem;
