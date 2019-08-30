import React, { useState } from "react";
import { View, Text } from "react-native";
import use from "../hooks";

export default function DropdownSelect({ children, onValueChanged, ...props }) {
  return (
    <select
      onChange={({ nativeEvent: { target } }) =>
        onValueChanged(target.value, target.selectedIndex)
      }
    >
      {React.Children.map(children, option => (
        <option>{option}</option>
      ))}
    </select>
  );
}
