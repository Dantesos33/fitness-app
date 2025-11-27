import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
  <Stack>
    <Stack.Screen name='index' options={{headerShown: false}}/>
    <Stack.Screen name='exercise' options={{title: "Exercises", headerTitleAlign: "center"}}/>
  </Stack>
)
}

export default RootLayout