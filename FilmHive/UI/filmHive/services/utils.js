import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

class Utils {
    static getYear(year) {
        return new Date(year).getFullYear();
    }

    static formatDate(date) {
       date=new Date(date);
       return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    
    static async pickImage(setImageUri, setBase64Image) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Access to the camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            setImageUri(uri);
            setBase64Image(base64);
        }
    }

    static base64ToImageUri(base64String) {
        return base64String ? `data:image/png;base64,${base64String}` : null;
    }
    
}

export default Utils;
