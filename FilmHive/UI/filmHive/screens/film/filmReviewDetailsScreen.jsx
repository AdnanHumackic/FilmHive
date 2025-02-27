import React from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import Utils from "../../services/utils";

export default function FilmReviewDetailsScreen({ navigation }) {
  const route = useRoute();
  const { review } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          style={styles.thumbnail}
          source={
            review.movie.poster
              ? { uri: review.movie.poster }
              : require("../../assets/noThumbnail.png")
          }
        />
        <View style={styles.posterAndDetails}>
          <Image
            style={styles.poster}
            source={
              review.movie.poster
                ? { uri: review.movie.poster }
                : require("../../assets/noPoster.jpg")
            }
          />
        </View>
        <View style={styles.goBackIconContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackIcon}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.reviewContainer}>
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
                  <Text style={styles.watched}>
                    Watched {Utils.formatDate(review.reviewDate)}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.stars}>
                      {"⭐".repeat(Math.round(review.grade))}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#1F1D36",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginTop: 80,
    marginLeft: 25,
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
  watched: {
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: -1,
  },
  posterAndDetails: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 120,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 15,
  },
});
