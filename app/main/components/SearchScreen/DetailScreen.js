import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const DetailScreen = (props) => {

    const navigation = useNavigation()
    const urlSearch = props?.route?.params?.url
    const [url,setUrl] = useState('')
    console.log('urlSearch',urlSearch)
    // useEffect
    useEffect(() => {
        setUrl(urlSearch)
    },[url])
    const renderHeader = () => {
        return(
            <View style={{flexDirection:'row',marginTop:MSCALE(56),alignItems:'center',marginBottom:MSCALE(13)}}>
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                <Image
                    width={MSCALE(24)}
                    height={MSCALE(24)}
                    resizeMode={'contain'}
                    source={require('./asset/back.png')}
                    style={{width:MSCALE(24),height:MSCALE(24),marginLeft:MSCALE(15)}}
                    />
                </TouchableOpacity>
                <Text style={{
                textAlign:'center',
                flex:1,
                fontWeight:'500',fontSize:MSCALE(22)}}>bai viet</Text>
                    {/* <View  style={{
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
                        style={{ width: MSCALE(24), height: MSCALE(22), alignSelf: 'center', marginLeft: MSCALE(11) }}
                    />
                </View> */}
            </View>

        )
    }
    const renderWebview = () => {
        return(
            <WebView source={{ uri: url }} />
        )
    }

    // function handling


   
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
          {renderHeader()}
          {renderWebview()}
          {/* <NetworkError/> */}
        </View>
    )
}
export default memo(DetailScreen)