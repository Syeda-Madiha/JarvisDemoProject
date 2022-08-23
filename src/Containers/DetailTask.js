import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from "react-native";
const DetailTask=({route,navigation})=>{
    const {taskData}=route.params
    console.log("task data",taskData)
    const card = (tasks) => {
        return (
            <View style={styles.topCard}>
                <View style={styles.leftCard}>
                    <Text style={{marginBottom:9,color:"grey",fontSize:11}}>
                        ID: {tasks.item.reference_number}
                    </Text>
                    <Text style={{marginBottom:14,fontWeight:"700",fontSize:12}}>
                        {tasks.item.task_type.name}
                    </Text>
                    <Text style={{marginBottom:7,fontSize:11}}>
                        {tasks.item.name}
                    </Text>
                    <Text style={{marginBottom:7,fontSize:11,color:"grey",marginTop:13}}>
                        {tasks.item.created_at}
                    </Text>
                </View>
                <View style={styles.rightCard}>
                    <TouchableOpacity style={styles.progress}>
                        <Text style={{fontSize:11,color:"rgba(255,224,4,0.97)",fontWeight:"600"}}>{tasks.item.status.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.lett}>
                        <Text style={{color:"white"}}>
                            {tasks.item.assignee?.name[0]}
                        </Text>
                    </View>

                </View>
            </View>
        )
    }
    return(
        <View style={styles.mainView}>
        <View>
            <View style={styles.topView}>
                <View style={styles.top}>
                    <TouchableOpacity>
                        <Image style={styles.imgicon} source={require('@/Assets/Images/arrow.png')}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:"column",marginLeft:15}}>
                        <Text style={{marginBottom: 8, fontSize: 15, fontWeight: "600"}}>
                            {taskData[0]?.name}
                        </Text>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{fontSize: 11, color: "grey"}}>
                                New
                            </Text>
                            <View style={{paddingHorizontal:1,paddingVertical:1,backgroundColor:"grey",borderColor:"grey",borderWidth:1,borderRadius:20 ,margin:4}}></View>
                            <Text style={{fontSize: 11, color: "grey"}}>
                                ID:{taskData[0]?.related_to_id}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.middleView}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color: "purple", fontSize: 11}}>{taskData[0]?.status.name}</Text>
                    </TouchableOpacity>
                    <Image style={styles.imgicon} source={require('@/Assets/Images/pencil.png')}/>
                </View>
            </View>
            <View style={styles.bottomView}>
                    <Text style={{fontSize: 13, marginRight: 30, color: "purple", paddingBottom: 15}} onPress={()=>navigation.goBack()}>
                        Detail
                    </Text>
                <View style={styles.lineBorder}>
                <Text style={{fontSize: 13, marginRight: 30}}>
                    Tasks
                </Text>
                </View>
            </View>
            <FlatList
                data={taskData}
                keyExtractor={(index) => {
                    return index.id
                }}
                renderItem={card}
            />
        </View>
        </View>
    )
}
export default DetailTask


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
        alignItems:"center",
        marginLeft:15
    },
    middleView: {
        flexDirection: "row",
        marginRight: 15,
        alignItems:"center"
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
    adminView:{
        flexDirection:"row",
        alignItems:"center",
    },
    myCard:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:20,
        paddingHorizontal:5
    },
    lett:{
        borderColor:"rgba(83,171,89,0.66)",
        borderWidth:1,
        borderRadius:50,
        backgroundColor:"rgba(51,152,56,0.91)",
        marginVertical:20,
        marginLeft:20,
        marginRight:15,
        height:25,
        width:25,
        alignItems:"center",
        justifyContent:"center"
    },
    break:{
        borderColor: "rgba(229,227,227,0.91)",
        borderWidth: 1
    },
    seperator:{
        borderColor: "rgba(229,229,227,0.91)",
        borderWidth: 3
    },
    statusView:{
        flexDirection:"column",
    },
    innerStatus:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:15,
        marginLeft:30,
        marginBottom:20
    },
    buttonBot:{
        alignItems:"center",
        borderColor:"rgba(231,209,250,0.91)",
        borderRadius:4,
        borderWidth:1,
        marginVertical:14,
        marginBottom:25,
        marginHorizontal:14,
        padding:10,
        backgroundColor:"rgba(231,209,250,0.91)",
    },
    contact:{
        flexDirection:"row"
    },
    botContact:{
        flexDirection:"row",
        marginRight:35
    },
    mainContact:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingBottom:10
    },
    contactBtn:{
        borderColor:"rgba(229,229,227,0.91)",
        borderWidth:1,
        borderRadius:50,
        height:27,
        width:27,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:6
    },
    imgicon:{
        height:20,
        width:20,
        marginLeft:0
    },
    iconTop:{
        height:18,
        width:18,
    },
    iconBot:{
        height:22,
        width:22,
    },
    deal:{
        borderColor:"rgba(225,222,222,0.91)",
        borderWidth:1,
        borderRadius:50,
        backgroundColor:"rgba(225,222,222,0.91)",
        marginVertical:16,
        marginLeft:18,
        marginRight:15,
        height:25,
        width:25,
        alignItems:"center",
        justifyContent:"center"
    },
    lettContact:{
        borderColor:"rgba(43,110,210,0.91)",
        borderWidth:1,
        borderRadius:50,
        backgroundColor:"rgba(43,110,210,0.91)",
        marginVertical:20,
        marginLeft:20,
        marginRight:15,
        height:25,
        width:25,
        alignItems:"center",
        justifyContent:"center"
    },
    filter: {
        borderColor: "rgba(198,203,203,0.91)",
        borderWidth: 1,
        padding: 12,
        borderRadius: 20,
        width: 80,
        alignItems: "center",
        marginLeft:20
    },
    topCard:{
        flexDirection:"row",
        marginVertical:15,
        borderBottomColor:"rgba(198,203,203,0.91)",
        borderBottomWidth:1,
        marginHorizontal:20,
        justifyContent:"space-between",
    },
    rightCard:{
        justifyContent:"space-between",
        marginBottom:20,
        alignItems:"flex-end"
    },
    leftCard:{
        marginBottom:20,
    },
    progress:{
        borderColor:"rgba(248,241,195,0.91)",
        borderWidth:1,
        borderRadius:20,
        padding:7,
        backgroundColor:"rgba(248,241,195,0.91)",
    },


})
