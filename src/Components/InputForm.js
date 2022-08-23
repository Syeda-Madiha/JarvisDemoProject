import React from "react";
import {View, Text, Image, TextInput} from "react-native";
const InputForm=(props)=>{
    return(
        <View style={props.style}
        >
            <View style={{margin: 10}}>
                <Image style={props.styleImg} source={props.source}/>
            </View>
            <View style={{margin: 10}}>
                <Text style={{marginBottom: 3, fontSize: 13}}>{props.label}</Text>
                <TextInput style={{marginBottom: 10}}
                           keyboardType={props.keyboardType}
                           placeholder={props.placeHolder}
                           onChangeText={props.onChangeInput}
                           value={props.value}
                >
                </TextInput>
                <View style={props.styleBr}></View>
            </View>
        </View>
    )
}
export default InputForm
