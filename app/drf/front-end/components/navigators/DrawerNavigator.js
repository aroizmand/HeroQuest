import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../settings/SettingsScreen";
import ProfileScreen from "../profile/ProfileScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import MetricInputScreen from "../metrics/MetricInputScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        cardStyle: { backgroundColor: "black" },
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Metrics" component={MetricInputScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
