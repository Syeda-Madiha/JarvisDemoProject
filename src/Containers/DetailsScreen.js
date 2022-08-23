import React from "react"
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from "react-native";
import {useIdListQuery} from "@/Services/opportunityID";
const DetailsScreen = ({route, navigation}) => {
    const {extraData} = route.params
    console.log("extra data", extraData.id)
    const response = useIdListQuery(extraData.id)
    const taskList = response?.data?.tasks
    console.log("id res", taskList)
    const card = (extraData) => {
        return (
            <View style={styles.myCard}>
                <View style={{margin: 10}}>
                    <Image style={styles.iconTop} source={require('@/Assets/Images/human.png')}/>
                </View>
                <View style={{marginLeft: 2}}>
                    <Text style={{fontSize: 11, color: "grey", marginBottom: 6}}>
                        Client Type
                    </Text>
                    <Text style={{fontSize: 11}}> {extraData.client.client_type.name}</Text>
                </View>
                <View style={{
                    borderRightColor: "rgba(203,203,202,0.91)",
                    borderRightWidth: 1,
                    padding: 10,
                    height: 40
                }}></View>
                <View style={{margin: 10}}>
                    <Image style={styles.iconTop} source={require('@/Assets/Images/amounticon.png')}/>
                </View>
                <View style={{marginLeft: 2}}>
                    <Text style={{fontSize: 11, color: "grey", marginBottom: 6}}>
                        Amount
                    </Text>
                    <Text style={{fontSize: 11}}>Lbp {extraData.expected_amount}</Text>
                </View>
                <View style={{
                    borderRightColor: "rgba(203,203,202,0.91)",
                    borderRightWidth: 1,
                    padding: 10,
                    height: 40
                }}></View>
                <View style={{margin: 10}}>
                    <Image style={styles.iconTop} source={require('@/Assets/Images/closing.png')}/>
                </View>
                <View style={{marginLeft: 2}}>
                    <Text style={{fontSize: 11, color: "grey", marginBottom: 6}}>
                        Expected Closing
                    </Text>
                    <Text style={{fontSize: 11}}>{extraData.expected_closing_at}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.imgicon} source={require('@/Assets/Images/arrow.png')}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: "column", marginLeft: 15}}>
                        <Text style={{marginBottom: 8, fontSize: 15, fontWeight: "600"}}>
                            {extraData.client.name}
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontSize: 11, color: "grey"}}>
                                New
                            </Text>
                            <View style={{
                                paddingHorizontal: 1,
                                paddingVertical: 1,
                                backgroundColor: "grey",
                                borderColor: "grey",
                                borderWidth: 1,
                                borderRadius: 20,
                                margin: 4
                            }}></View>
                            <Text style={{fontSize: 11, color: "grey"}}>
                                ID:{extraData.id}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.middleView}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color: "purple", fontSize: 11}}>{extraData.status.name}</Text>
                    </TouchableOpacity>
                    <Image style={styles.imgicon} source={require('@/Assets/Images/pencil.png')}/>
                </View>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.lineBorder}>
                    <Text style={{fontSize: 13, marginRight: 30, color: "purple", paddingBottom: 15}}>
                        Detail
                    </Text>
                </View>
                <Text style={{fontSize: 13, marginRight: 30}}
                      onPress={() => navigation.navigate('TaskDetails', {
                    taskData: taskList
                })}>
                    Tasks
                </Text>
            </View>
            <View style={styles.line}>
            </View>
            <View style={styles.adminView}>
                <View style={styles.lett}>
                    <Text style={{color: "white", fontWeight: "600"}}>{extraData?.assignee?.name[0]}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 10, color: "grey", marginBottom: 6}}>
                        Assigned To
                    </Text>
                    <Text style={{fontSize: 13}}>{extraData?.assignee?.name}</Text>
                </View>
            </View>
            <View style={styles.break}></View>
            {
                card(extraData)
            }
            <View style={styles.seperator}></View>
            <View style={styles.statusView}>
                <View style={styles.innerStatus}>
                    <View>
                        <View style={styles.deal}>
                            <Image style={styles.iconTop} source={require('@/Assets/Images/tick.png')}/>
                        </View>
                        <Text style={{marginRight: 20, fontSize: 11}}>
                            {extraData.disposition.name}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.deal}>
                            <Text style={{color: "white", fontWeight: "600"}}>2</Text>
                        </View>
                        <Text style={{color: "grey", fontSize: 11}}>
                            {extraData.disposition.slug}
                        </Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonBot}>
                        <Text style={{color: "purple"}}>Change Status</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <View style={{marginVertical: 22, marginLeft: 18}}>
                    <Text style={{color: "grey", fontWeight: "700"}}>CONTACTS</Text>
                </View>
                <View style={styles.mainContact}>
                    <View style={styles.contact}>
                        <View style={styles.lettContact}>
                            <Text style={{color: "white"}}>{extraData.name[0]}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 12, fontWeight: "700", marginBottom: 7}}>
                                {extraData.name} <Text style={{color: "grey", fontWeight: "400"}}>(primary)</Text>
                            </Text>
                            <Text style={{fontSize: 11, marginBottom: 7, fontWeight: "600"}}>
                                {extraData.contact.phone}
                            </Text>
                            <Text style={{fontSize: 12, marginBottom: 7, color: "grey"}}>
                                Staff.<Text style={{color: "green"}}>Active</Text>
                            </Text>
                        </View>

                    </View>
                    <View style={styles.botContact}>
                        <View style={styles.contactBtn}>
                            <Image style={styles.iconBot} source={require('@/Assets/Images/phoneic.png')}/>
                        </View>
                        <View style={styles.contactBtn}>
                            <Image style={styles.iconBot} source={require('@/Assets/Images/msg.png')}/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.line}>

            </View>
        </View>
    )
}
export default DetailsScreen;

const styles = StyleSheet.create({
    mainView: {
        marginTop: 63,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15
    },
    middleView: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    bottomView: {
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 20
    },
    button: {
        borderColor: "rgba(229,229,227,0.91)",
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "rgba(231,209,250,0.91)",
        padding: 6,
        marginRight: 15,
        alignContent: "center"
    },
    lineBorder: {
        borderBottomColor: "purple",
        borderBottomWidth: 2,
    },
    line: {
        borderColor: "rgba(229,229,227,0.91)",
        borderWidth: 2
    },
    adminView: {
        flexDirection: "row",
        alignItems: "center",
    },
    myCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    lett: {
        borderColor: "rgba(83,171,89,0.66)",
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "rgba(51,152,56,0.91)",
        marginVertical: 20,
        marginLeft: 20,
        marginRight: 15,
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    break: {
        borderColor: "rgba(229,227,227,0.91)",
        borderWidth: 1
    },
    seperator: {
        borderColor: "rgba(229,229,227,0.91)",
        borderWidth: 3
    },
    statusView: {
        flexDirection: "column",
    },
    innerStatus: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 30,
        marginBottom: 20
    },
    buttonBot: {
        alignItems: "center",
        borderColor: "rgba(231,209,250,0.91)",
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 14,
        marginBottom: 25,
        marginHorizontal: 14,
        padding: 10,
        backgroundColor: "rgba(231,209,250,0.91)",
    },
    contact: {
        flexDirection: "row"
    },
    botContact: {
        flexDirection: "row",
        marginRight: 35
    },
    mainContact: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    contactBtn: {
        borderColor: "rgba(229,229,227,0.91)",
        borderWidth: 1,
        borderRadius: 50,
        height: 27,
        width: 27,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6
    },
    imgicon: {
        height: 20,
        width: 20,
        marginLeft: 0
    },
    iconTop: {
        height: 18,
        width: 18,
    },
    iconBot: {
        height: 22,
        width: 22,
    },
    deal: {
        borderColor: "rgba(225,222,222,0.91)",
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "rgba(225,222,222,0.91)",
        marginVertical: 16,
        marginLeft: 18,
        marginRight: 15,
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    lettContact: {
        borderColor: "rgba(43,110,210,0.91)",
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "rgba(43,110,210,0.91)",
        marginVertical: 20,
        marginLeft: 20,
        marginRight: 15,
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center"
    }

})
