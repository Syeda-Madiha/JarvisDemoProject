import React, {useState, useEffect, useRef} from "react"
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActionSheetIOS} from "react-native";
import {Formik} from "formik";
import {SheetManager, SheetProvider} from "react-native-actions-sheet";
import InputForm from "@/Components/InputForm";
import {useAddListMutation} from "@/Services/addOpportunityApi";
import {useClientListQuery} from "@/Services/clientApi";
import {useUserListQuery} from "@/Services/userApi";
import RBSheet from "react-native-raw-bottom-sheet";
import {useSelector} from "react-redux";
import {useSourceListQuery} from "@/Services/sourceApi";

const AddOpportunity = () => {
    const [addList, {data, isError, error}] = useAddListMutation()
    const response=useClientListQuery();
    const userRes=useUserListQuery();
    const sourceRes=useSourceListQuery();
    const clients = useSelector((state) => {
        console.log('clients ',state.clientSlice.clientData)
        return state.clientSlice.clientData
    })
    const users = useSelector((state) => {
        console.log('users ',state.userSlice.userData)
        return state.userSlice.userData
    })
    const types = useSelector((state) => {
        console.log('types ',state.opportunitySlice.opportunityType)
        return state.opportunitySlice.opportunityType
    })
    const sources = useSelector((state) => {
        console.log('source ',state.sourceSlice.sourceData)
        return state.sourceSlice.sourceData
    })

    const [show, setShow] = useState("")
    const [client, setClient] = useState("")
    const [assignee, setAssignee] = useState("")
    const [source, setSource] = useState("")
    const [typeId, setTypeId] = useState()
    const [clientID, setClientID] = useState()
    const [assigneeID, setAssigneeID] = useState()
    const [sourceID, setSourceID] = useState("")
    const refRBSheet = useRef();
    const refClient = useRef();
    const refSource = useRef();
    const refType=useRef()
    const dynamicValues = {
        "client": {
            key: 1,
            icon: require('@/Assets/Images/usage.png'),
            type: 'SelectClient',
            value: '',
            label: 'Client'
        },
        "oppName": {
            key: 2,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Opportunity Name",
            value: '',
            keyboardType: "default",
            label: 'Opportunity Name'
        },
        "opportunityType": {
            key: 3,
            icon: require('@/Assets/Images/usage.png'),
            type: 'SelectType',
            value: '',
            label: 'Opportunity Type'
        },
        "amount": {
            key: 4,
            icon: require('@/Assets/Images/usage.png'),
            type: 'input',
            placeholder: "Enter Amount (LBP)",
            value: '',
            keyboardType: "number-pad",
            label: 'Amount'
        },
        // "source": {
        //     key: 5,
        //     icon:require('@/Assets/Images/usage.png'),
        //     type: 'select',
        //     value: '',
        //     label: 'Source'
        // },
        "assignee": {
            key: 5,
            icon: require('@/Assets/Images/usage.png'),
            type: 'SelectAssignee',
            value: '',
            label: 'Assignee'
        },

        "source": {
            key: 6,
            icon: require('@/Assets/Images/usage.png'),
            type: 'SelectSource',
            value: '',
            label: 'Source'
        },

    }
    useEffect(() => {
        console.log("userRes",users)
        console.log("types",types)
        console.log("source",sources)
    }, [response,clients,userRes,users,types,sourceRes,sources])

    const showTypes = () => {
        let views = [];
        types.map((item)=>{
            views.push(
                <Text key={item.id} onPress={()=>{setShow(item.name), setTypeId(item.id)}}>{item.name}</Text>
            )
        })
        return views
    }
    const showClients = () => {
        let views = [];
       clients.map((item)=>{
           views.push(
               <Text key={item.id} onPress={()=>{setClient(item.name),setClientID(item.id)}}>{item.name}</Text>
           )
       })
        return views
    }
    const showSource = () => {
        let views = [];
       sources.map((item)=>{
            views.push(
                <Text key={item.id} onPress={()=>{setSource(item.name),setSourceID(item.id)}}>{item.name}</Text>
            )
        })
        return views
    }

    const showAssignee = () => {
        let views = [];
        if(users)
        {
            users.map((item)=>{
                views.push(
                    <Text key={item.id} onPress={()=>{setAssignee(item.name),setAssigneeID(item.id)}}>{item.name}</Text>
                )
            })
        }
        else{

        }

        return views
    }
    const getForm = (formikProps) => {
        let views = [];
        Object.keys(dynamicValues).map((item) => {
            switch (dynamicValues[item].type) {
                case "input":
                    views.push(
                        <InputForm style={styles.input} key={dynamicValues[item].key?.toString()} styleImg={styles.iconStyle} source={formikProps?.values[item].icon}
                        label={formikProps?.values[item].label} keyboardType={formikProps?.values[item].keyboardType} placeHolder={formikProps?.values[item].placeholder}
                                   onChangeInput={(text) => {
                                       formikProps.setFieldValue([item], {
                                           ...formikProps?.values[item],
                                           value: text
                                       })
                                   }}
                                   value={formikProps?.values[item].value}
                                   styleBr={styles.break}
                        />
                    )
                    break
                case "SelectType":
                    views.push(
                        <View style={styles.input}
                              key={dynamicValues[item].key?.toString()}
                        >
                            <View style={{margin: 10}}>
                                <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                            </View>
                            <View style={{margin: 10}}>
                                <Text style={{marginBottom: 3, fontSize: 13}}
                                      onPress={()=>refType.current.open()}>{formikProps?.values[item].label}</Text>
                                <RBSheet
                                    ref={refType}
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
                                    {showTypes()}
                                </RBSheet>
                                <Text
                                    onPress={() => {
                                        formikProps.setFieldValue([item], {
                                            ...formikProps?.values[item], value: show
                                        })

                                    }}>
                                    {show}
                                </Text>
                                <View style={styles.break}></View>
                            </View>
                        </View>
                    )
                    break
                case "SelectClient":
                    views.push(
                        <View style={styles.input}
                              key={dynamicValues[item].key?.toString()}
                        >
                            <View style={{margin: 10}}>
                                <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                            </View>
                            <View style={{margin: 10}}>
                                <Text style={{marginBottom: 3, fontSize: 13}}
                                      onPress={()=>refClient.current.open()}>{formikProps?.values[item].label}</Text>
                                <RBSheet
                                    ref={refClient}
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
                                    {showClients()}
                                </RBSheet>
                                <Text
                                    onPress={() => {
                                        formikProps.setFieldValue([item], {
                                            ...formikProps?.values[item], value: client
                                        })

                                    }}>
                                    {client}
                                    {clientID}
                                </Text>
                                <View style={styles.break}></View>
                            </View>
                        </View>
                    )
                    break
                case "SelectAssignee":
                    views.push(
                        <View style={styles.input}
                              key={dynamicValues[item].key?.toString()}
                        >
                            <View style={{margin: 10}}>
                                <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                            </View>
                            <View style={{margin: 10}}>
                                <Text style={{marginBottom: 3, fontSize: 13}}
                                      onPress={()=>refRBSheet.current.open()}>{formikProps?.values[item].label}</Text>
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
                                    {showAssignee()}
                                </RBSheet>
                                <Text
                                    onPress={() => {
                                        formikProps.setFieldValue([item], {
                                            ...formikProps?.values[item], value: assignee
                                        })

                                    }}>
                                    {assignee}
                                    {assigneeID}
                                </Text>
                                <View style={styles.break}></View>
                            </View>
                        </View>
                    )
                    break
                case "SelectSource":
                    views.push(
                        <View style={styles.input}
                              key={dynamicValues[item].key?.toString()}
                        >
                            <View style={{margin: 10}}>
                                <Image style={styles.iconStyle} source={formikProps?.values[item].icon}/>
                            </View>
                            <View style={{margin: 10}}>
                                <Text style={{marginBottom: 3, fontSize: 13}}
                                      onPress={()=>refSource.current.open()}>{formikProps?.values[item].label}</Text>
                                <RBSheet
                                    ref={refSource}
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

                                    {showSource()}
                                </RBSheet>
                                <Text
                                    onPress={() => {
                                        formikProps.setFieldValue([item], {
                                            ...formikProps?.values[item], value: source
                                        })

                                    }}>
                                    {source}
                                    {sourceID}
                                </Text>
                                <View style={styles.break}></View>
                            </View>
                        </View>
                    )
                    break
                default:
                    return (
                        <></>
                    )

            }


        })

        return views;
    }
    const postData = async (values) => {
        const body = {
            assignee_id: assigneeID,
            client_id: clientID,
            expected_amount: values?.amount?.value,
            name: values?.oppName?.value,
            opportunity_type_id: typeId,
            source_id: sourceID
        }
        await addList(body)
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
                    Add Opportunity
                </Text>
            </View>
            <View style={styles.break}></View>
            <Formik
                initialValues={dynamicValues}
                onSubmit={postData}


            >
                {(formikProps) => {
                    return (
                        <>
                            {getForm(formikProps)}
                            <TouchableOpacity style={styles.button} onPress={() => {
                                formikProps?.handleSubmit()
                            }}>
                                <Text style={{color: "white", fontWeight: "600"}}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )

                }}
            </Formik>
        </View>
    )
}
export default AddOpportunity
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
