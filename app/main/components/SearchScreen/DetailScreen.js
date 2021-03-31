import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import FastImage from 'react-native-fast-image';

import psl from 'psl'

const DetailScreen = (props) => {

    const navigation = useNavigation()
    const urlSearch = props?.route?.params?.url
    const domainUrl = props?.route?.params?.domain_url
    const indexCut = domainUrl?.indexOf('/')
    const domain = domainUrl?.slice(indexCut + 2)
    const [url, setUrl] = useState('')
    // useEffect
    useEffect(() => {
        setUrl(urlSearch)
    }, [url])
    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: MSCALE(Platform.OS == 'ios' ? 56 : 24),
                alignItems: 'center',
                marginBottom: MSCALE(17)
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        resizeMode={'contain'}
                        source={require('./asset/back.png')}
                        style={{ width: MSCALE(10), height: MSCALE(20), marginLeft: MSCALE(15) }}
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
                        fontFamily:'OpenSans-Regular',
                        color:'#015cd0',
                        fontWeight: '600',
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



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {renderHeader()}
            {renderWebview()}
            {/* <NetworkError/> */}
        </View>
    )
}
export default memo(DetailScreen)