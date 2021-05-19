import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import { MSCALE, isIphoneX } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import NetworkError from './NetworkErrorScreen';

import psl from 'psl'

const DetailScreen = (props) => {

    const navigation = useNavigation()
    const urlSearch = props?.route?.params?.url
    const domainUrl = props?.route?.params?.domain_url
    const indexCut = domainUrl?.indexOf('/')
    const domain = domainUrl?.slice(indexCut + 2)
    const [url, setUrl] = useState('')
    const [isNetwork, setIsNetwork] = useState(true)

    // useEffect
    useEffect(() => {
       
        setUrl(urlSearch)
    }, [url])
    useEffect(() => {
        checkWifi()
    },[isNetwork])

    const checkWifi = async () => {
        try {
            const res = await NetInfo.fetch()
            setIsNetwork(res.isConnected)
            console.log('resssssss',res)
        } catch (error) {

        }

    }

    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: MSCALE(Platform.OS == 'ios' ? isIphoneX() ? 56 : 40 : 22),
                alignItems: 'center',
                marginBottom: MSCALE(16)
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: MSCALE(25),
                        height: MSCALE(40),
                        marginLeft: MSCALE(14)
                    }}
                >
                    <Image
                        resizeMode={'contain'}
                        source={require('./asset/back.png')}
                        style={{ width: MSCALE(10), height: MSCALE(20) }}
                    />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'OpenSans-Bold',
                        color: '#015cd0',
                        fontSize: MSCALE(19)
                    }}>{domain}</Text>
                </View>
                <View style={{ width: MSCALE(24) }} />
            </View>
        )
    }
    const renderWebview = () => {
        return (
            <WebView source={{ uri: url }} />
        )
    }

    // function handling

    console.log('isNetwork',isNetwork)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            
                { renderHeader()}
                {isNetwork ? renderWebview() : <NetworkError/>}
                
        </View>
    )
}
export default memo(DetailScreen)