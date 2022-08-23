import {Formik} from 'formik';
import React, {useEffect} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLoginUserMutation} from "@/Services/fetchApi";

const LoginScreen = ({navigation}) => {

    const [loginUser, {data, isError, error}] = useLoginUserMutation()
    const dynamicValues = {
        "email": {
            key: 1,
            type: 'input',
            value: 'admin@olxlb.com',
            keyboardType: 'default',
            label: 'Email'
        },
        "password": {
            key: 2,
            type: 'input',
            value: 'Super@321',
            keyboardType: "ascii-capable",
            label: 'Password'
        }
    }
    useEffect(() => {
    }, [data, isError])
    const login = async (values) => {
        const body = {
            "email": values?.email?.value,
            "password": values?.password?.value
        }
        await loginUser(body)
    }

    const getDynamicValues = (formikProps) => {
        let views = [];
        Object.keys(dynamicValues).map((item) => {
            if (dynamicValues[item].type === 'input') {
                views.push(
                    <View
                        key={dynamicValues[item].key?.toString()}
                        style={{marginVertical: 16, marginHorizontal: 16}}>
                        <Text>{formikProps?.values[item].label}</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                keyboardType={formikProps?.values[item].keyboardType}
                                placeholder="Enter your Password"
                                onChangeText={(text) => {
                                    formikProps.setFieldValue([item], {
                                        ...formikProps?.values[item],
                                        value: text
                                    })
                                }}
                                value={formikProps?.values[item].value}
                            >
                            </TextInput>
                        </View>

                    </View>
                )
            }
        })

        return views;
    }
    return (
        <View style={{marginTop: 120}}>
            <View style={{marginHorizontal: 35, marginVertical: 20}}>
                <Text style={styles.textStyle}>jarvis</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
                <Text style={styles.jarvis}>Login into Jarvis</Text>
            </View>
            <View style={{marginHorizontal: 30, marginVertical: 18}}>
                <Text style={{color: "grey"}}>Hi Welcome to Jarvis! Happy CRM :)</Text>
            </View>
            <Formik
                initialValues={dynamicValues}
                onSubmit={login}
            >
                {(formikProps) => {
                    return (
                        <>
                            {getDynamicValues(formikProps)}
                            <TouchableOpacity style={styles.button} onPress={() => {
                                formikProps?.handleSubmit()
                            }}>
                                <Text style={{color: "white", fontWeight: "600"}}>Login</Text>
                            </TouchableOpacity>
                            <View style={{marginVertical: 20, marginHorizontal: 20, alignItems: "center"}}>
                                <Text style={{fontSize: 12, color: "grey"}}>POWERED BY EMPGLABS</Text>
                            </View>
                        </>
                    )

                }}
            </Formik>
        </View>
    )
}
export default LoginScreen;
const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        // padding: 25,
        borderRadius: 4,
        borderColor: "grey"
    },
    text: {
        marginBottom: 10
    }
    ,
    textStyle: {
        fontSize: 35,
        fontStyle: "italic",
        color: "purple",
        fontWeight: "700"
    },
    jarvis: {
        fontSize: 18,
        fontWeight: "600"
    },
    button: {
        alignItems: "center",
        borderColor: "purple",
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 15,
        marginHorizontal: 14,
        padding: 14,
        backgroundColor: "purple"
    }
});
