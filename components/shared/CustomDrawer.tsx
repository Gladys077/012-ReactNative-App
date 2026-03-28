import { BorderRadius } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View } from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { colors, fonts } = useTheme();

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 12,
          padding: 40,
          marginBottom: 40,
          height: 150,
          borderRadius: BorderRadius.xl,
          backgroundColor: colors.brandCommon,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: BorderRadius.full,
            backgroundColor: "white",
            height: 96,
            width: 96,
          }}
        >
          <Text
            style={{
              color: colors.brandCommon,
              fontFamily: fonts.robotoBold,
              fontSize: 30,
            }}
          >
            FH
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
