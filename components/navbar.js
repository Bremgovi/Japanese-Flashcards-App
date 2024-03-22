import { StyleSheet, Text, View } from "react-native";
export default function NavBar({ title, subtitle }) {
  return (
    <View style={styles.navBar}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.headerFoot}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    backgroundColor: "rgba(196, 19, 81, 1)",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Inter_500Medium",
    fontSize: 35,
    letterSpacing: 5,
    color: "white",
    fontWeight: "bold",
  },
  headerFoot: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    letterSpacing: 5,
    color: "rgba(253, 226, 255, 1)",
    fontWeight: "bold",
  },
});
