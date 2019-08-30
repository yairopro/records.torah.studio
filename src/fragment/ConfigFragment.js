import React, { useState, useCallback } from "react";
import use from "../hooks";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { selectFile } from "../utils";
import DropdownSelect from "../component/DropdownSelect";
import torah from "../res/torah";

export default function ConfigFragment({ onSubmitted }) {
  const [file, setFile] = useState();
  const [sefer, setSefer] = useState(0);
  const [sidra, setSidra] = useState(0);

  return (
    <View
      style={use.memo({
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      })}
    >
      <TouchableOpacity
        style={use.memo(() => ({
          padding: 15,
          borderStyle: "dashed",
          borderBottomWidth: 1,
          maxWidth: "100%",
          marginBottom: 15
        }))}
        onPress={use.callback(async () => {
          let file = await selectFile("audio/*");
          if (file) setFile(file);
        })}
      >
        <Text>{file ? file.name : "Selectionnez un fichier audio"}</Text>
      </TouchableOpacity>

      <DropdownSelect
        onValueChanged={use.callback((title, index) => {
          setSidra(0);
          setSefer(index);
        })}
      >
        {use.memo(() => torah.map(({ title }) => title))}
      </DropdownSelect>

      <DropdownSelect
        key={sefer}
        onValueChanged={use.callback((title, index) => setSidra(index))}
      >
        {use.memo(() => torah[sefer].sidrot.map(({ title }) => title), [sefer])}
      </DropdownSelect>

      <TouchableOpacity
        onPress={use.callback(() => onSubmitted(file, sefer, sidra), [
          onSubmitted
        ])}
        disabled={!file}
        style={use.memo(
          {
            margin: 10,
            padding: 10,
            backgroundColor: file ? "blue" : "lightgrey"
          },
          [file]
        )}
      >
        <Text style={{ color: "white" }}>START</Text>
      </TouchableOpacity>
    </View>
  );
}
