import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
  <Stack>
    <Stack.Screen name='index' options={{title: 'Exercises', headerTitleAlign: 'center'}}/>
  </Stack>
)
}

export default RootLayout