import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {useTheme} from '@/Hooks'
import TabsScreen from "@/Navigators/TabsScreen";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "@/Components/LoginScreen";
import {useSelector} from "react-redux";
import DetailsScreen from "@/Containers/DetailsScreen";
import Filters from "@/Containers/Filters";
import AddOpportunity from "@/Containers/AddOpportunity";
import DetailTask from "@/Containers/DetailTask";

const Stack = createStackNavigator()
// @refresh reset
const ApplicationNavigator = () => {
    const [login, setLogin] = useState(false)
    const user = useSelector((state) => {
        return state?.user?.loggedInUser
    })

    useEffect(() => {
        if (user && user?.id) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    }, [user])

    const auth = () => {
        if (!login) {
            return (
                <>
                    <Stack.Navigator initialRouteName="Tabs" screenOptions={{headerShown: false}}>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                    </Stack.Navigator>
                </>
            )
        } else {
            return (
                <>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen
                            name="tabsDetail"
                            component={TabsScreen}
                        />
                        <Stack.Screen
                            name="OpportunityDetails"
                            component={DetailsScreen}
                        />
                        <Stack.Screen
                            name="TaskDetails"
                            component={DetailTask}
                        />
                        <Stack.Screen
                            name="Filters"
                            component={Filters}
                        />
                        <Stack.Screen
                            name="Add"
                            component={AddOpportunity}
                        />
                    </Stack.Navigator>

                </>
            )
        }
    }
    const {Layout, NavigationTheme} = useTheme()
    const {colors} = NavigationTheme
    return (
        <View style={[Layout.fill, {backgroundColor: colors.card}]}>
            <NavigationContainer>
                {auth()}
            </NavigationContainer>
        </View>
    )
}

export default ApplicationNavigator
