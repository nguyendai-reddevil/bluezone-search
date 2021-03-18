import React,{ memo, useEffect, useState,useMemo } from 'react';
import { View,Text,TextInput,Image, Keyboard, RefreshControl,ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import ItemSearch from './component/ItemKeyword';
import ResponseScreen from './ResponseScreen';
import NetworkError from './NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ItemResponse from './component/ItemResponse';
const arrayTest = [
    {id:1,content:'cách cài đặt bluezone'},
    {id:2,content:'cách cài đặt ứng dụng sức khoẻ bluezone khoẻ khoe khoe'},
    {id:3,content:'24h'},
    {id:4,content:'tin tức 48h qua'},
    {id:5,content:'cách sử dụng bluezone'},
    {id:6,content:'làm sao sử dụng bluezone'},
    {id:7,content:'tác dụng của bluezone'},
    {id:8,content:'số người cài đặt bluezone'}
]

const SearchScreen = (props) => {

    const navigation = useNavigation()
    const keySearch = props?.route?.params?.key
    const [text,setText] = useState( keySearch || '')
    const [arrayKey,setArrayKey] = useState([])
    const [refresh,setRefresh] = useState(false)
    // useEffect

    useEffect(() => {
        fillterKeyword()
    },[text])

    // function render
    const renderDetal = () => {
        return(
            <View style={{flex:1}}>
                <FlatList
                    style={{marginLeft:MSCALE(57)}}
                    data={arrayKey}
                    keyExtractor={(item,index) => `key_${index}`}
                    renderItem={(item) => <ItemSearch item={item.item}/>}
                />
            </View>
        )
    }

    const renderHeader = () => {
        return(
            <View style={{flexDirection:'row',marginTop:MSCALE(56)}}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                <Image
                    width={MSCALE(24)}
                    height={MSCALE(24)}
                    resizeMode={'contain'}
                    source={require('./asset/back.png')}
                    style={{width:MSCALE(24),height:MSCALE(24),marginLeft:MSCALE(15),alignSelf:'center'}}
                    />
                </TouchableOpacity>
               
                    <View  style={{
                            flexDirection:'row',
                            width:MSCALE(343),
                            height:MSCALE(36),
                            borderRadius:MSCALE(10),
                            marginLeft: MSCALE(20),
                            // marginRight: MSCALE(12),
                            // top: calc(50% - 36px/2);
                            backgroundColor:'rgba(118, 118, 128, 0.12)'}}>
                                <Image
                        width={MSCALE(24)}
                        height={MSCALE(22)}
                        resizeMode={'contain'}
                        source={require('./asset/search.png')}
                        style={{width:MSCALE(24),height:MSCALE(22),alignSelf:'center',marginLeft:MSCALE(11)}}
                    />
                    <TextInput
                        onSubmitEditing={actionSearch}
                        returnKeyType={'search'}
                        onChangeText={t => actionChangeText(t)}
                        autoFocus={text ? true : false}
                        value={text}
                        style={{width:MSCALE(221),height:MSCALE(22),alignSelf:'center',marginLeft:MSCALE(7)}}
                        placeholder={'Tra cứu bệnh nhân,tin tức y tế...'}
                    />
                    <TouchableOpacity 
                    onPress={actionClear}
                    style={{alignItems:'flex-end',width:MSCALE(20),height:MSCALE(36),justifyContent:'center',marginLeft:MSCALE(49)}}>
                    <Image
                        width={MSCALE(14)}
                        height={MSCALE(14)}
                        resizeMode={'contain'}
                        source={require('./asset/cancel.png')}
                        style={{width:MSCALE(14),height:MSCALE(14),marginLeft:MSCALE(57)}}
                    />
                    {/* <Text style={{alignSelf:'center'}}>abc</Text> */}
                    </TouchableOpacity>
                    
                    </View>
            </View>
           
        )
    }


    // function handling

    const actionClear = () => {
        setText('')
    }
    const actionSearch = () => {
        navigation.push('ResponseScreen',{key:text})
        // setArrayResponse(dataTest)
    }
    const actionChangeText = (t) => {
        setText(t)
    }
    const fillterKeyword = () => {
        let dataNew = arrayTest.filter(item => {
           let textUp = text.toUpperCase()
           let keyword = item.content.toUpperCase()
           return keyword.includes(textUp)
        })
       setArrayKey(dataNew)
    }

   
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
          {renderHeader()}
            {renderDetal()}
          {/* <NetworkError/> */}
        </View>
    )
}
export default  memo(SearchScreen)