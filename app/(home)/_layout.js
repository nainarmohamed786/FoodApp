import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
     <Provider store={store}  >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="hotel" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="order" />
      </Stack>
    </Provider>
    <StatusBar style="dark" />
    </>
   

  );
}
