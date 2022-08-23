import React, {useEffect, useState, useRef} from "react"
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActionSheetIOS} from "react-native";
import {Formik} from "formik";
import {useSelector, useDispatch} from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import {filterData} from "@/Store/filterSlice";
import { useNavigation } from '@react-navigation/native';

const Filters = (props) => {
    const navigation = useNavigation()
    const [show, setShow] = useState("")
    const [id, setId] = useState()
    const filterObj = useSelector((state) => {
        return state.filterSlice.filterData
    })
    const types = useSelector((state) => {
        return state.opportunitySlice.clientType
    })

    const refRBSheet = useRef();
    const dispatch = useDispatch()
    const dynamicValues = {
        "id": {
            key: 1,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Reference ID",
            value: filterObj && filterObj?.refID?.length > 0 ? filterObj?.refID: '',
            keyboardType: 'numeric',
            label: 'Ref id#'
        },
        "name": {
            key: 2,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Opportunity Name",
            value: filterObj && filterObj?.name?.length > 0 ? filterObj?.name: '',
            keyboardType: "default",
            label: 'Opportunity Name'
        },
        "clientName": {
            key: 3,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Client Name",
            value: filterObj && filterObj?.clientName?.length > 0 ? filterObj?.clientName: '',
            keyboardType: "default",
            label: 'Client Name'
        },
        "phone": {
            key: 4,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Phone Number",
            value: filterObj && filterObj?.phone?.length > 0 ? filterObj?.phone: '',
            keyboardType: "number-pad",
            label: 'Phone Number'
        },
        "contactName": {
            key: 5,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Contact Name",
            value: filterObj && filterObj?.contactName?.length > 0 ? filterObj?.contactName: '',
            keyboardType: "default",
            label: 'Contact Name'
        },
        "addedBy": {
            key: 6,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Added by",
            value: filterObj && filterObj?.addedBy?.length > 0 ? filterObj?.addedBy: '',
            keyboardType: "default",
            label: 'Added by'
        },
        "clientType": {
            key: 7,
            icon: require('@/Assets/Images/usage.png'),
            type: 'select',
            value: filterObj && filterObj?.clientType ? filterObj?.clientType: {},
            label: 'Client Type'
        },

    }
    useEffect(() => {

    }, [filterObj, types])
    const showActions = () => {
        let views = [];
        types.map((item) => {
            views.push(
                <Text key={item.id} onPress={() => {
                    setShow(item.name), setId(item.id)
                }}>{item.name}</Text>
            )
        })
        return views
    }
    const getForm = (formikProps) => {
        let views = [];
        Object.keys(dynamicValues).map((item) => {
            if (dynamicValues[item].type === 'input') {
                views.push(
                    <View style={styles.input}
                          key={dynamicValues[item].key?.toString()}
                    >
                        <View style={{margin: 10}}>
                            <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                        </View>
                        <View style={{margin: 10}}>
                            <Text style={{marginBottom: 3, fontSize: 13}}>{formikProps?.values[item].label}</Text>
                            <TextInput style={{marginBottom: 10}}
                                       keyboardType={formikProps?.values[item].keyboardType}
                                       placeholder={formikProps?.values[item].placeholder}
                                       onChangeText={(text) => {
                                           formikProps.setFieldValue([item], {
                                               ...formikProps?.values[item],
                                               value: text
                                           })
                                       }}
                                       value={formikProps?.values[item].value}
                            >
                            </TextInput>
                            <View style={styles.break}></View>
                        </View>
                    </View>
                )
            } else {
                views.push(
                    <View style={styles.input}
                          key={dynamicValues[item].key?.toString()}
                    >
                        <View style={{margin: 10}}>
                            <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                        </View>
                        <View style={{margin: 10}}>
                            <Text style={{marginBottom: 3, fontSize: 13}}
                                  onPress={() => refRBSheet.current.open()}>{formikProps?.values[item].label}</Text>
                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent"
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                            >
                                {showActions()}
                            </RBSheet>
                            <Text
                                onPress={() => {
                                    formikProps.setFieldValue([item], {
                                        ...formikProps?.values[item], value: show
                                    })

                                }}>
                                {show}
                                {id}
                            </Text>
                            <View style={styles.break}></View>
                        </View>
                    </View>
                )
            }
        })

        return views;
    }

    const postFilter = (values) => {
        const body = {
            refID: values?.id?.value,
            name: values?.name?.value,
            clientName: values?.clientName?.value,
            phone: values?.phone?.value,
            contactName: values?.contactName?.value,
            addedBy: values?.addedBy?.value,
            clientType: show,
            clientId: id,
            paginationInfo:{
                page:1
            }
        }
        dispatch(filterData({...body}))
         navigation?.goBack()
        // navigation.navigate('Opportunity')
    }
    return (
        <View style={styles.topView}>
            <View style={{
                marginLeft: 40,
                marginBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Text style={{fontSize: 19, fontWeight: "700"}}>
                    Filters
                </Text>
                <Text style={{marginRight: 20, color: "rgba(68,6,136,0.91)"}}>Reset</Text>
            </View>
            <View style={styles.break}></View>
            <Formik
                initialValues={dynamicValues}
                onSubmit={postFilter}
            >
                {(formikProps) => {
                    return (
                        <>
                            {getForm(formikProps)}
                            <TouchableOpacity style={styles.button} onPress={() => {
                                formikProps?.handleSubmit()
                            }}>
                                <Text style={{color: "white", fontWeight: "600"}}>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                        </>
                    )

                }}
            </Formik>
        </View>
    )
}
export default Filters
const styles = StyleSheet.create({
    topView: {
        marginTop: 65
    },

    break: {
        borderBottomColor: "rgba(218,218,218,0.91)",
        borderBottomWidth: 1,
        width: 400
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
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconStyle: {
        height: 25,
        width: 25,
    },
})
