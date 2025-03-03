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
import * as yup from "yup";
import { Formik } from "formik";
import CustomInput from "../../components/reusableInput";
import UserService from "../../services/userService";
import CheckBox from "react-native-check-box";
import Utils from "../../services/utils";

export default function UserProfileEditScreen({ navigation }) {
  const [users, setUsers] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(
    AuthProvider.profilePicture || null
  );

  const [thumbnailImageUri, setThumbnailImageUri] = useState(null);
  const [base64ThumbnailImage, setBase64ThumbnailImage] = useState(
    AuthProvider.profileThumbnail || null
  );
  const userService = new UserService();

  const fetchUser = async () => {
    try {
      const users = await userService.getUsers();
      const filteredUsers = users.resultList.filter(
        (user) => user.userId != AuthProvider.userId
      );
      setUsers(filteredUsers);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (AuthProvider.profilePicture) {
      setBase64Image(AuthProvider.profilePicture);
    }
    if (AuthProvider.profileThumbnail) {
      setBase64ThumbnailImage(AuthProvider.profileThumbnail);
    }
  }, []);
  const getValidationSchema = (users) =>
    yup.object().shape({
      firstName: yup
        .string()
        .matches(
          /^[A-Z][a-zA-Z]*$/,
          "First name must start with a capital letter."
        )
        .required("Please enter first name."),
      lastName: yup
        .string()
        .matches(
          /^[A-Z][a-zA-Z]*$/,
          "Last name must start with a capital letter."
        )
        .required("Please enter last name."),
      email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .test("unique", "Email is already taken", function (value) {
          if (!value || !users) return true;
          return !users.some((user) => user.email === value);
        }),
      phone: yup
        .string()
        .matches(
          /^\+[0-9]{7,15}$/,
          "Phone number must start with + and have 7 to 15 digits."
        )
        .required("Please enter a valid phone number."),
      username: yup
        .string()
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username can not be over 20 characters long.")
        .required("Please enter username.")
        .test("unique", "Username is already taken.", async function (value) {
          if (!value || !users) return true;
          const existingUser = await users.find(
            (user) => user.username.toLowerCase() === value.toLowerCase()
          );
          return !existingUser;
        }),
      oldPassword: yup.string().when("isChecked", {
        is: true,
        then: (schema) =>
          schema
            .test("oldPassword", "Old password is incorrect", function (value) {
              if (!value) return true;
              return value === AuthProvider.password;
            })
            .required("Please enter your current password."),
        otherwise: (schema) => schema.notRequired(),
      }),
      newPassword: yup.string().when("isChecked", {
        is: true,
        then: (schema) =>
          schema
            .min(6, "Password must be at least 6 characters long.")
            .required("Please enter new password."),
        otherwise: (schema) => schema.notRequired(),
      }),
      passwordConfirmation: yup.string().when("isChecked", {
        is: true,
        then: (schema) =>
          schema
            .oneOf(
              [yup.ref("newPassword")],
              "Password confirmation must match the new password."
            )
            .required("Please confirm your password."),
        otherwise: (schema) => schema.notRequired(),
      }),
    });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            thumbnailImageUri
              ? { uri: thumbnailImageUri }
              : base64ThumbnailImage
              ? { uri: Utils.base64ToImageUri(base64ThumbnailImage) }
              : require("../../assets/noThumbnail.png")
          }
        />
        <TouchableOpacity
          style={styles.uploadThumbnailPicture}
          onPress={Utils.pickImage.bind(
            this,
            setThumbnailImageUri,
            setBase64ThumbnailImage
          )}
        >
          <Ionicons name="arrow-up-circle-outline" size={22} color="white" />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.image}
            source={
              imageUri
                ? { uri: imageUri }
                : base64Image
                ? { uri: Utils.base64ToImageUri(base64Image) }
                : require("../../assets/defaultUser.png")
            }
          />
          <TouchableOpacity
            style={styles.uploadProfilePicture}
            onPress={Utils.pickImage.bind(this, setImageUri, setBase64Image)}
          >
            <Ionicons name="arrow-up-circle-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{
            firstName: AuthProvider.firstName,
            lastName: AuthProvider.lastName,
            email: AuthProvider.email,
            phone: AuthProvider.phone,
            username: AuthProvider.username,
            oldPassword: "",
            newPassword: "",
            passwordConfirmation: "",
            isChecked: false,
          }}
          validationSchema={getValidationSchema(users)}
          onSubmit={async (values) => {
            try {
              const userUpdate = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                username: values.username,
                isDeleted: false,
                isActive: true,
                profilePicture: base64Image,
                profileThumbnail: base64ThumbnailImage,
                ...(values.isChecked && values.newPassword
                  ? {
                      newPassword: values.newPassword,
                      passwordConfirmation: values.passwordConfirmation,
                    }
                  : {}),
              };
              await userService.updateUser(AuthProvider.userId, userUpdate);
              AuthProvider.username = values.username;
              AuthProvider.firstName = values.firstName;
              AuthProvider.lastName = values.lastName;
              AuthProvider.email = values.email;
              AuthProvider.phone = values.phone;
              AuthProvider.biography = values.biography;
              AuthProvider.profilePicture = values.profilePicture;
              AuthProvider.profileThumbnail = values.profileThumbnail;
              AuthProvider.isDeleted = values.isDeleted;
              AuthProvider.isActive = values.isActive;
              AuthProvider.timeOfDeletion = values.timeOfDeletion;
              AuthProvider.createdAt = values.createdAt;
              AuthProvider.modifiedAt = values.modifiedAt;
              AuthProvider.modifiedBy = values.modifiedBy;
              AuthProvider.roleId = values.roleId;
              if (isChecked && values.newPassword) {
                AuthProvider.password = values.newPassword;
              }
              alert("Profile updated successfully.");
              return;
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
          }) => (
            <View style={{ width: "80%" }}>
              <CustomInput
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={errors.firstName}
                touched={touched.firstName}
                iconName={"person-outline"}
              />
              <CustomInput
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={errors.lastName}
                touched={touched.lastName}
                iconName={"person-outline"}
              />
              <CustomInput
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                iconName={"mail-outline"}
              />
              <CustomInput
                label="Phone"
                placeholder="Enter your phone number"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                error={errors.phone}
                touched={touched.phone}
                iconName={"phone-portrait-outline"}
              />
              <CustomInput
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                error={errors.username}
                touched={touched.username}
                iconName={"person-outline"}
              />
              <CheckBox
                style={styles.checkBox}
                onClick={() => setFieldValue("isChecked", !values.isChecked)}
                isChecked={values.isChecked}
                leftText={"Change password?"}
                leftTextStyle={styles.text}
                checkBoxColor="#E9A6A6"
              />

              {values.isChecked ? (
                <View>
                  <CustomInput
                    label="Old password"
                    placeholder="Enter your current password"
                    value={values.oldPassword}
                    onChangeText={handleChange("oldPassword")}
                    onBlur={handleBlur("oldPassword")}
                    error={errors.oldPassword}
                    touched={touched.oldPassword}
                    iconName={"lock-closed-outline"}
                  />
                  <CustomInput
                    label="New Password"
                    placeholder="Enter your new password"
                    value={values.newPassword}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    iconName={"lock-closed-outline"}
                  />
                  <CustomInput
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    value={values.passwordConfirmation}
                    onChangeText={handleChange("passwordConfirmation")}
                    onBlur={handleBlur("passwordConfirmation")}
                    error={errors.passwordConfirmation}
                    touched={touched.passwordConfirmation}
                    iconName={"lock-closed-outline"}
                  />
                </View>
              ) : (
                <View></View>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginBottom: 10,
  },
  uploadProfilePicture: {
    position: "absolute",
    top: 5,
    right: 40,
    backgroundColor: "#E9A6A6",
    borderRadius: 15,
    padding: 4,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E9A6A6",
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: "#1F1D36",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkBox: {
    padding: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#E9A6A6",
    fontWeight: "500",
  },
  uploadThumbnailPicture: {
    position: "absolute",
    top: 165,
    right: 30,
    backgroundColor: "#E9A6A6",
    borderRadius: 15,
    padding: 4,
  },
});
