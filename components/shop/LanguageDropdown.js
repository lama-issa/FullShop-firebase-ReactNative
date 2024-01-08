// LanguageDropdown.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/actions/languageActions";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
      >
        <Picker.Item label={t("English")} value="en" />
        <Picker.Item label={t("Arabic")} value="ar" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  picker: {
    width: "100%",
  },
});
export default LanguageDropdown;
