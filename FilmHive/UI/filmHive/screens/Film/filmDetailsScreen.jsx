import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function FilmDetailsScreen({ navigation }) {
    const route = useRoute();
    const { film } = route.params;

    return (
        <View style={styles.container}>
            <Image
                style={styles.thumbnail}
                source={film.thumbnail ? { uri: film.thumbnail } : require('../../assets/noThumbnail.png')}
            />
            <View style={styles.posterAndDetails}>
                <Image
                    style={styles.poster}
                    source={film.poster ? { uri: film.poster } : require('../../assets/noPoster.jpg')}
                />

                <View style={styles.details}>
                    <Text style={styles.title}>
                        {film.title}<Text style={styles.releaseYear}> {new Date(film.releaseYear).getFullYear()}
                            <Text style={styles.duration}>  {film.duration} mins</Text>
                        </Text>
                    </Text>
                    <ScrollView>
                        <Text style={styles.description}>{film.description}</Text>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.goBackIconContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIcon}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => console.log("x")}>
                    <Ionicons name="star-outline" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Rate or Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log("y")}>
                    <Ionicons name="list-outline" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Add to Lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log("z")}>
                    <Ionicons name="bookmark-outline" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Add to Watchlist</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1D36',
    },
    thumbnail: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    posterAndDetails: {
        flexDirection: 'row',
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
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    description: {
        color: '#B0B0B0',
        fontSize: 14,
        marginTop: 10,
        lineHeight: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40
    },
    year: {
        color: 'white',
        fontSize: 16,
    },
    duration: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
    },
    releaseYear: {
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        paddingHorizontal: 4,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9A6A6',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    icon: {
        marginRight: 4,
        color: '#1F1D36',
    },
    buttonText: {
        color: '#1F1D36',
        fontSize: 14,
        fontWeight: 'bold',
    },
    goBackIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackIconContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        borderRadius: 30,
        backgroundColor: '#E9A6A6',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
