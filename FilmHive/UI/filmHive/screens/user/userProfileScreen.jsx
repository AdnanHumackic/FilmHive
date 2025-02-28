import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthProvider from "../../services/authProvider";
import Utils from "../../services/utils";
import { State } from "react-native-gesture-handler";
import FilmFavoriteService from "../../services/filmFavoriteService";

export default function UserProfileScreen({ navigation }) {
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  const filmFavoriteService = new FilmFavoriteService();

  const fetchFavoriteFilms = async () => {
    try {
      const filter = {
        userId: AuthProvider.userId,
        isDeleted: false,
        includeTables: "Movie",
      };
      const favoriteFilms = await filmFavoriteService.getFilmFavorites({
        filter,
      });
      setFavoriteFilms(favoriteFilms.resultList);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchFavoriteFilms();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.goBackIconContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackIcon}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.thumbnail}
        source={
          AuthProvider.profileThumbnail
            ? { uri: Utils.base64ToImageUri(AuthProvider.profileThumbnail) }
            : require("../../assets/noThumbnail.png")
        }
      />
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.image}
          source={
            AuthProvider.profilePicture
              ? { uri: Utils.base64ToImageUri(AuthProvider.profilePicture) }
              : require("../../assets/defaultUser.png")
          }
        />
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => navigation.navigate("UserProfileEdit")}
        >
          <Ionicons name="create-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.favFilmsContainer}>
        <Text style={styles.username}>
          {AuthProvider.username}'s Favorite Films
        </Text>
        <View style={styles.separator}></View>

        {favoriteFilms && favoriteFilms.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {favoriteFilms.map((film, index) => (
              <View key={index} style={styles.movieRow}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FilmDetails", { film: film.movie })
                  }
                >
                  <Image
                    style={styles.poster}
                    source={
                      film.movie.poster
                        ? { uri: film.movie.poster }
                        : require("../../assets/noPoster.jpg")
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noFavorites}>
            You dont' have any favorite films.
          </Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D36",
  },
  goBackIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  goBackIconContainer: {
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
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },

  profileImageContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 15,
  },
  editIconContainer: {
    position: "absolute",
    top: 5,
    right: 40,
    backgroundColor: "#1F1D36",
    borderRadius: 15,
    padding: 4,
  },
  favFilmsContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E9A6A6",
  },
  movieRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    paddingHorizontal: 4,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  noFavorites: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
    marginHorizontal: 5,
  },
});
