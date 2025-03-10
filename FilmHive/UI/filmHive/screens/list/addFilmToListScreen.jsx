import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import CustomInput from "../../components/reusableInput";
import * as yup from "yup";
import { Form, Formik } from "formik";
import ListService from "../../services/listService";
import AuthProvider from "../../services/authProvider";
import CheckBox from "react-native-check-box";
import { Dropdown } from "react-native-element-dropdown";
import ListFilmService from "../../services/listFilmService";

export default function AddFilmToListScreen({ navigation }) {
  const route = useRoute();
  const { film } = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);

  const listService = new ListService();
  const listFilmService = new ListFilmService();

  const validationSchema = yup.object().shape({
    listName: yup.string().when("isChecked", {
      is: false,
      then: (schema) => schema.required("Please enter list name."),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  async function fetchList() {
    try {
      const filter = {
        userId: AuthProvider.userId,
        isDeleted: false,
      };
      const list = await listService.getList({ filter });

      const formattedData = list.resultList.map((item) => ({
        label: item.listName,
        value: item.listId,
      }));
      setData(formattedData);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.filmTitle}>
          <View style={styles.goBackIconContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackIcon}
            >
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 80 }}>
            <Text style={styles.listText}>
              Add film <Text style={styles.title}>{film.title}</Text> to list
            </Text>

            <View style={styles.inputView}>
              <Formik
                initialValues={{
                  listName: "",
                  listDescription: "",
                  isChecked: false,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  if (!values.isChecked) {
                    try {
                      const listInsert = {
                        userId: AuthProvider.userId,
                        listName: values.listName,
                        listDescription: values.listDescription,
                        filmId: film.filmId,
                        isDeleted: false,
                      };
                      await listService.addList(listInsert);
                      alert("List added successfully.");
                      navigation.goBack();
                    } catch (error) {
                      alert(error.message);
                    }
                  } else {
                    try {
                      if (!value) {
                        alert("Pick a list please.");
                        return;
                      }
                      const listFilmInsert = {
                        listId: value,
                        filmId: film.filmId,
                        isActive: true,
                      };
                      await listFilmService.addListFilm(listFilmInsert);
                      alert("Film successfully added to the list.");
                      navigation.goBack();
                    } catch (error) {
                      alert(error.message);
                    }
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {!values.isChecked ? (
                      <View>
                        <CustomInput
                          iconName="list-outline"
                          placeholder="List name"
                          value={values.listName}
                          onChangeText={handleChange("listName")}
                          onBlur={handleBlur("listName")}
                          error={errors.listName}
                          touched={touched.listName}
                        />
                        <TextInput
                          style={styles.textArea}
                          placeholder="Write list description..."
                          placeholderTextColor="white"
                          multiline={true}
                          numberOfLines={4}
                          value={values.listDescription}
                          onChangeText={handleChange("listDescription")}
                          onBlur={handleBlur("listDescription")}
                        />
                      </View>
                    ) : (
                      <View />
                    )}

                    <CheckBox
                      style={styles.checkBox}
                      onClick={() =>
                        setFieldValue("isChecked", !values.isChecked)
                      }
                      isChecked={values.isChecked}
                      leftText={"Add film to existing list?"}
                      leftTextStyle={styles.cbText}
                      checkBoxColor="#E9A6A6"
                    />
                    {values.isChecked ? (
                      <View>
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocus && { borderColor: "gray" },
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? "Select item" : "..."}
                          searchPlaceholder="Search..."
                          value={value}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                          }}
                        />
                      </View>
                    ) : (
                      <View />
                    )}

                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      <Ionicons
                        name="save-outline"
                        size={20}
                        color="white"
                        style={styles.icon}
                      />
                      <Text style={styles.buttonText}>Add to list</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </View>
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
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  listText: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 20,
  },
  inputView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  textArea: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#1F1D36",
    marginTop: 10,
  },
  textInputArea: {
    height: 40,
    color: "white",
    backgroundColor: "#1F1D36",
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
  cbText: {
    fontSize: 16,
    color: "#E9A6A6",
    fontWeight: "500",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#1F1D36",
    marginTop: 10,
  },
  dropdownIcon: {
    marginRight: 5,
    color: "white",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
