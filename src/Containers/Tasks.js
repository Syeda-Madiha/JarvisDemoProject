import React, {useEffect} from "react"
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {useTaskListQuery} from "@/Services/taskApi";
import {useSelector} from "react-redux";

const Tasks = ({navigation}) => {
    const response=useTaskListQuery();
        const tasks = useSelector((state) => {
            return state.taskSlice.taskData
        })

    useEffect(()=>{
       // console.log(response)
    },[response,tasks])
   //debugger
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

    return (
        <View style={styles.topView}>
            <View style={{marginLeft:20}}>
                <Text style={{fontSize: 17, fontWeight: "600"}}>
                    Tasks
                </Text>
            </View>
            <View style={{marginTop: 18,marginBottom:10}}>
                <TouchableOpacity style={styles.filter}>
                    <Text style={{fontSize:14}}>Filters</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(index) => {
                    return index.id
                }}
                renderItem={card}
            />
        </View>
    )

}
export default Tasks;

const styles = StyleSheet.create({
    topView: {
        marginTop: 65,
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
    lett:{
        borderColor:"rgba(51,152,56,0.91)",
        borderWidth:1,
        borderRadius:50,
        paddingVertical:4,
        paddingHorizontal:8,
        backgroundColor:"rgba(51,152,56,0.91)"
    }

})
