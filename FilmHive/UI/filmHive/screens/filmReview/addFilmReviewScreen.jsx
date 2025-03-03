import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import StarRating from "react-native-star-rating-widget";
import { TextInput } from "react-native-gesture-handler";
import Utils from "../../services/utils";
import FilmReviewService from "../../services/filmReviewService";
import AuthProvider from "../../services/authProvider";
import FilmFavoriteService from "../../services/filmFavoriteService";

export default function AddFilmReviewScreen({ navigation }) {
  const route = useRoute();
  const { film } = route.params;
  const [starRating, setStarRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [favorite, setFavorite] = useState(false);

  const filmReviewService = new FilmReviewService();
  const filmFavoriteService = new FilmFavoriteService();

  async function saveReview() {
    try {
      const reviewInsert = {
        userId: AuthProvider.userId,
        movieId: film.filmId,
        grade: starRating,
        comment: reviewText,
        reviewDate: new Date(),
        isActive: true,
      };

      await filmReviewService.addReview(reviewInsert);
      alert("Review added successfully.");
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  }

  async function toggleFavorite() {
    try {
      const filter = {
        movieId: film.filmId,
        userId: AuthProvider.userId,
      };

      const favorites = await filmFavoriteService.getFilmFavorites({ filter });

      if (favorites.resultList.length > 0) {
        const existingFavorite = favorites.resultList[0];
        const isCurrentlyActive = existingFavorite.isActive;

        const favoriteUpdate = {
          isActive: !isCurrentlyActive,
          isDeleted: isCurrentlyActive,
          userId: AuthProvider.userId,
          movieId: film.filmId,
        };

        await filmFavoriteService.updateFilmFavorite(
          existingFavorite.filmFavoriteId,
          favoriteUpdate
        );

        setFavorite(!isCurrentlyActive);
      } else {
        const favoriteInsert = {
          movieId: film.filmId,
          userId: AuthProvider.userId,
          isActive: true,
          isDeleted: false,
        };

        await filmFavoriteService.addFilmFavorite(favoriteInsert);
        setFavorite(true);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackIconContainer}
      >
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.filmTitle}>
          Add review for{" "}
          <Text style={{ color: "#E9A6A6", textAlign: "left" }}>
            {film.title}
          </Text>{" "}
          <Text style={styles.releaseYear}>
            {Utils.getYear(film.releaseYear)}
          </Text>
        </Text>
        <View style={styles.separator} />
        <View style={styles.ratingContainer}>
          <StarRating
            rating={starRating}
            starSize={30}
            starSpacing={2}
            starColor="white"
            emptyStarColor="white"
            fillColor="white"
            onChange={setStarRating}
          />
          <TouchableOpacity
            onPress={() => toggleFavorite(film)}
            style={{ marginLeft: 10 }}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={28}
              color={favorite ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textInputArea}>
          <TextInput
            style={styles.textArea}
            placeholder="Write your review..."
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={20}
            value={reviewText}
            onChangeText={setReviewText}
          />
          {starRating !== 0 || reviewText.trim() !== "" ? (
            <TouchableOpacity style={styles.button} onPress={saveReview}>
              <Ionicons
                name="save-outline"
                size={20}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Add review</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 100,
  },
  filmTitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 20,
  },
  releaseYear: {
    color: "white",
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E9A6A6",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  heartIcon: {
    marginLeft: 10,
  },
  textArea: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    color: "white",
    textAlignVertical: "top",
  },
  textInputArea: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9A6A6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 4,
    color: "#1F1D36",
  },
});
