import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FilmService from "../../services/filmService";

export default function FilmListScreen({ navigation }) {
  const [films, setFilms] = useState([]);
  const filter = {
    isDeleted: false,
  };

  const fetchFilms = async () => {
    const filmService = new FilmService();

    try {
      const films = await filmService.getFilms({ filter });
      setFilms(films.resultList);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const renderFilmItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FilmDetails", { film: item })}
    >
      <View style={styles.filmCard}>
        <Image
          style={styles.filmImage}
          source={
            item.poster
              ? { uri: item.poster }
              : require("../../assets/noPoster.jpg")
          }
        />
        <Text style={styles.filmTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuIconContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuIcon}
        >
          <Ionicons name="menu-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {films.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No films available.</Text>
        </View>
      ) : (
        <FlatList
          data={films}
          renderItem={renderFilmItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 50) / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D36",
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 100,
  },
  filmCard: {
    backgroundColor: "#2D2A4A",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    alignItems: "center",
    width: cardWidth,
  },
  filmImage: {
    width: 90,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  filmTitle: {
    color: "#E9A6A6",
    fontSize: 14,
    textAlign: "center",
    flexWrap: "wrap",
    flexShrink: 1,
    width: "100%",
  },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    borderRadius: 30,
    backgroundColor: "#E9A6A6",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noDataText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});
