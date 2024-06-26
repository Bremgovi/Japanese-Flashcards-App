import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function CategoryList({ navigation }) {
  const categories = [
    { id: 1, image: require(`../assets/images/familia.png`), text: "Familia" },
    { id: 2, image: require(`../assets/images/animales.png`), text: "Animales" },
    { id: 3, image: require(`../assets/images/numeros.png`), text: "Numeros" },
    { id: 4, image: require(`../assets/images/comida.png`), text: "Comida" },
    { id: 5, image: require(`../assets/images/fechas.png`), text: "Fechas" },
    { id: 6, image: require(`../assets/images/modales.png`), text: "Modales" },
    { id: 7, image: require(`../assets/images/gramatica.png`), text: "Gramática" },
    { id: 8, image: require(`../assets/images/verbos.png`), text: "Verbos" },
    { id: 9, image: require(`../assets/images/adjetivos.png`), text: "Adjetivos" },
  ];

  return (
    <View style={styles.categoryList}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => {
            navigation.navigate("QuestionGame", { category: category.text });
          }}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryItem: {
    backgroundColor: "#d22a6d",
    borderRadius: 20,
    padding: 10,
    width: "40%",
    aspectRatio: 1,
    margin: 10,
    alignItems: "center",
    resizeMode: "contain",
  },
  categoryImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  categoryText: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
