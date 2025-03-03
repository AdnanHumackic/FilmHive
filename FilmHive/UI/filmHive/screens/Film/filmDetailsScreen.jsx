import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import FilmReviewService from "../../services/filmReviewService";
import AuthProvider from "../../services/authProvider";
import Utils from "../../services/utils";

export default function FilmDetailsScreen({ navigation }) {
  const route = useRoute();
  const { film } = route.params;
  const [reviews, setReviews] = useState([]);
  [];

  const filmReviewService = new FilmReviewService();
  const filteredReviews = reviews?.filter(
    (review) => review.comment && review.comment.length > 0
  );

  const fetchReviews = async () => {
    try {
      const filter = {
        movieId: film.filmId,
        isDeleted: false,
        includeTables: "Movie,User",
      };
      const reviews = await filmReviewService.getReviews({ filter });
      setReviews(reviews.resultList);
    } catch (error) {
      alert(error.message);
    }
  };

  async function reviewExists() {
    try {
      const filter = {
        movieId: film.filmId,
        userId: AuthProvider.userId,
        isDeleted: false,
      };
      const reviews = await filmReviewService.getReviews({ filter });
      return reviews.resultList.length > 0;
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.thumbnail}
          source={
            film.thumbnail
              ? { uri: film.thumbnail }
              : require("../../assets/noThumbnail.png")
          }
        />
        <View style={styles.posterAndDetails}>
          <Image
            style={styles.poster}
            source={
              film.poster
                ? { uri: film.poster }
                : require("../../assets/noPoster.jpg")
            }
          />
          <View style={styles.details}>
            <Text style={styles.title}>
              {film.title}
              <Text style={styles.releaseYear}>
                {" "}
                {Utils.getYear(film.releaseYear)}
                <Text style={styles.duration}> {film.duration} mins</Text>
              </Text>
            </Text>
            {film && film.trailerUrl ? (
              <Text
                style={styles.trailer}
                onPress={() => Linking.openURL(film.trailerUrl)}
              >
                TRAILER
              </Text>
            ) : (
              <Text style={styles.trailer}>NO TRAILER</Text>
            )}
            <ScrollView>
              <Text style={styles.description}>{film.description}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.goBackIconContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackIcon}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              try {
                const exists = await reviewExists();
                if (exists) {
                  navigation.navigate("UpdateFilmReview", { film });
                } else {
                  navigation.navigate("AddFilmReview", { film });
                }
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <Ionicons
              name="star-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Rate or Review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("y")}
          >
            <Ionicons
              name="list-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Add to Lists</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("z")}
          >
            <Ionicons
              name="bookmark-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Add to Watchlist</Text>
          </TouchableOpacity>
        </View>

        {filteredReviews && filteredReviews.length > 0 ? (
          <>
            <View style={styles.reviewHeaderContainer}>
              <Text style={styles.reviewTitle}>All reviews</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>

            <View style={styles.separator} />

            {filteredReviews.map((review, index) => (
              <View key={index} style={styles.reviewContainer}>
                <View style={styles.reviewContainer}>
                  <View style={styles.reviewHeader}>
                    <Image
                      style={styles.profileImage}
                      source={
                        review.user.profilePicture
                          ? { uri: review.user.profilePicture }
                          : require("../../assets/defaultUser.png")
                      }
                    />
                    <View style={styles.headerText}>
                      <Text style={styles.reviewBy}>
                        Review by{" "}
                        <Text style={styles.reviewerName}>
                          {review.user.username}
                        </Text>
                      </Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.stars}>
                          {"⭐".repeat(Math.round(review.grade))}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.reviewText}>
                    {review.comment.length > 100
                      ? review.comment.substring(0, 100) + "..."
                      : review.comment}
                  </Text>
                  {review.comment.length > 100 && (
                    <Text
                      style={styles.readMore}
                      onPress={() =>
                        navigation.navigate("ReviewDetails", {
                          review: review,
                        })
                      }
                    >
                      Read more ➤
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noReviews}>This film has no reviews.</Text>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D36",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  posterAndDetails: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: -60,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  description: {
    color: "#B0B0B0",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  year: {
    color: "white",
    fontSize: 16,
  },
  duration: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  releaseYear: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    paddingHorizontal: 4,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9A6A6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  icon: {
    marginRight: 4,
    color: "#1F1D36",
  },
  buttonText: {
    color: "#1F1D36",
    fontSize: 14,
    fontWeight: "bold",
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

  separator: {
    height: 1,
    backgroundColor: "gray",
    opacity: 0.5,
    marginVertical: 10,
  },
  reviewHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  reviewTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  seeAll: {
    color: "#E9A6A6",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  trailer: {
    color: "#E9A6A6",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 20,
  },
  reviewContainer: {
    backgroundColor: "#2D2D42",
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginRight: 10,
    marginLeft: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  reviewBy: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  reviewerName: {
    color: "#E9A6A6",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    color: "#FFCC00",
    marginRight: 5,
  },
  reviewCount: {
    color: "#AAAAAA",
  },
  reviewText: {
    color: "#CCCCCC",
    lineHeight: 20,
    marginVertical: 10,
  },
  readMore: {
    color: "#E9A6A6",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  noReviews: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
});
