import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Redirect href="/(home)" />
      <StatusBar style="light" />
    </>

  );
}
