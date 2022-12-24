import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  })