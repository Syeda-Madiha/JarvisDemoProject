import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Opportunity from "@/Containers/Opportunity";
import Tasks from "@/Containers/Tasks";

const Tab = createBottomTabNavigator()
const TabScreen = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Opportunity"
                component={Opportunity}
            />
            <Tab.Screen
                name="TasksList"
                component={Tasks}
            />

        </Tab.Navigator>
    )
}

export default TabScreen
