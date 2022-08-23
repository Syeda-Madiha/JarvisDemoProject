import React, {useEffect, useState} from "react"
import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useOpportunityListQuery} from "@/Services/opportunityApi";
import {filterData} from "@/Store/filterSlice";


const Opportunity = ({navigation}) => {
    const opportunities = useSelector((state) => {
        return state.opportunitySlice.opportunityData
    })
    const filterDataObject = useSelector((state) => {
        return state.filterSlice?.filterData
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const response = useOpportunityListQuery(filterDataObject);
    useEffect(() => {
    }, [filterDataObject])

    const card = (opportunities) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("OpportunityDetails", {
                extraData: opportunities.item
            })}>
                <View key={opportunities.item.id} style={styles.topCard}>
                    <View style={styles.leftCard}>
                        <Text style={{marginBottom: 10, color: "grey", fontSize: 11}}>
                            ID: {opportunities.item.reference_number}
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontWeight: "700", fontSize: 12}}>
                                {opportunities.item.client.name}
                            </Text>
                            <View style={{
                                backgroundColor: "grey",
                                borderColor: "rgba(203,197,197,0.91)",
                                borderWidth: 2,
                                borderRadius: 20,
                                margin: 3
                            }}></View>
                            <Text style={{color: "grey", fontWeight: "400"}}> New</Text>
                        </View>
                        <Text style={{marginVertical: 12, color: "grey", fontSize: 12}}>
                            {opportunities.item.name}
                        </Text>
                        <Text
                            style={{marginBottom: 19, color: "rgba(73,11,124,0.91)", fontWeight: "700", fontSize: 12}}>
                            LBP {opportunities.item.expected_amount}
                        </Text>
                        <Text style={{marginBottom: 8, fontSize: 11, color: "grey"}}>
                            {opportunities.item.created_at}
                        </Text>
                    </View>
                    <View style={styles.rightCard}>
                        <TouchableOpacity style={styles.progress}>
                            <Text style={{
                                fontSize: 11,
                                color: "rgba(73,11,124,0.91)",
                                fontWeight: "600"
                            }}>{opportunities.item.status.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.lett}>
                            <Text style={{color: "rgba(250,250,250,0.91)", fontWeight: "600"}}>
                                {opportunities.item.client.name[0]}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    }
    const incPage = () => {
        console.log("Inc Page called")
        if (response?.data?.pagination.current_page < response?.data?.pagination.total_pages) {
            const body = {
                ...filterDataObject,
                paginationInfo: {
                    page: filterDataObject.paginationInfo.page + 1
                }
            }
            dispatch(filterData({...body}))
        }
    }
    const refresh = () => {
        //  console.log("refreshing")
        //   setLoading(true)
        const body = {
            refID: '',
            name: '',
            clientName: '',
            phone: '',
            contactName: '',
            addedBy: '',
            clientType: '',
            clientId: '',
            paginationInfo: {...{page: 1}}
        }

        dispatch(filterData({...body}))
        //   setLoading(false)
        // dispatch(emptyList())
        // console.log(filterDataObject)
    }
    return (
        <View style={styles.topView}>
            <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 17, fontWeight: "600"}}>
                    Opportunities
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{marginTop: 18, marginBottom: 10}}>
                    <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('Filters')}>
                        <Image style={styles.iconTop} source={require('@/Assets/Images/filters.png')}/>
                        <Text style={{fontSize: 13, paddingHorizontal: 4}}>Filters</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.add}>
                    <Text style={{fontSize: 17, color: "white", fontWeight: "700"}}
                          onPress={() => navigation.navigate('Add')}>
                        +
                    </Text>
                </View>
            </View>
            <FlatList
                data={opportunities}
                keyExtractor={(index) => {
                    return index.id
                }}
                renderItem={card}
                //  numColumns={10}
                onEndReachedThreshold={0.3}
                // onEndReached={incPage}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refresh}
                    />
                }
            />
        </View>
    )

}
export default Opportunity;

const styles = StyleSheet.create({
    topView: {
        marginTop: 65,
        marginBottom: 45
    },
    filter: {
        flexDirection: "row",
        borderColor: "rgba(198,203,203,0.91)",
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        width: 100,
        alignItems: "center",
        marginLeft: 20
    },
    topCard: {
        flexDirection: "row",
        marginVertical: 15,
        borderBottomColor: "rgba(198,203,203,0.91)",
        borderBottomWidth: 1,
        marginHorizontal: 20,
        justifyContent: "space-between",
    },
    rightCard: {
        justifyContent: "space-between",
        marginBottom: 20,
        alignItems: "flex-end"
    },
    leftCard: {
        marginBottom: 20,
    },
    progress: {
        borderColor: "rgba(156,225,229,0.91)",
        borderWidth: 1,
        borderRadius: 20,
        padding: 7,
        backgroundColor: "rgba(156,225,229,0.91)",
    },
    lett: {
        borderColor: "rgba(51,152,56,0.91)",
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "rgba(51,152,56,0.91)"
    },
    add: {
        borderColor: "rgba(73,11,124,0.91)",
        borderWidth: 1,
        borderRadius: 50,
        padding: 9,
        paddingHorizontal: 13,
        backgroundColor: "rgba(73,11,124,0.91)",
        marginRight: 18
    },
    iconTop: {
        height: 15,
        width: 15,
        marginHorizontal: 4
    },

})
