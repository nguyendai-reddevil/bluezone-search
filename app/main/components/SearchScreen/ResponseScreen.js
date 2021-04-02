import React, { memo, useEffect, useState, useMemo ,useRef} from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator,Dimensions,
    Platform, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { MSCALE ,isIphoneX} from './Reponsive';
import ItemSearch from './component/ItemKeyword';
import NetworkError from './NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ItemResponse from './component/ItemResponse';
import SearchScreen from './SearchScreen';
import FastImage from 'react-native-fast-image';
//api
import Api from './api/api';

const {width,height} = Dimensions.get('window')

export const Header = memo(({actionSetTextSearch,actionClear,text}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={{ marginLeft: MSCALE(19.8), }}
                onPress={() => navigation.goBack()}>
                <Image
                    resizeMode={'contain'}
                    source={require('./asset/back.png')}
                    style={{
                        width: MSCALE(10),
                        height: MSCALE(20),
                    }}
                />
            </TouchableOpacity>

            <View style={styles.containerInput}>
                <Image
                    resizeMode={'contain'}
                    source={require('./asset/search.png')}
                    style={styles.imageIcon}
                />

                <View style={styles.containerText}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={actionSetTextSearch}
                        style={{
                            justifyContent: 'center', 
                            paddingLeft:MSCALE(7),
                            paddingRight:MSCALE(16.9),
                        }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: MSCALE(15),
                                fontWeight: '400',
                            }}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={actionClear}
                    style={{
                        width: MSCALE(20),
                        height: MSCALE(36),
                        justifyContent: 'center',
                        marginHorizontal: MSCALE(16)
                    }}>
                    <FastImage
                        resizeMode={'contain'}
                        source={require('./asset/cancel.png')}
                        style={{
                            width: MSCALE(12), height: MSCALE(12)
                        }}
                    />
                </TouchableOpacity>

            </View>
        </View>

    )
})
const ResponseScreen = (props) => {

    const navigation = useNavigation()
    const keySearch = props?.route?.params?.key
    console.log('propspropsprops',props)
    const [text,setText] = useState(keySearch || '')
    const [showSearch,setShowSearch] = useState(false)
    const [isNetwork,setIsNetwork] = useState(true)
    const [refresh,setRefresh] = useState(false)
    const [loadmore,setLoadmore] = useState(false)
    const [arrayResponse,setArrayResponse] = useState([])
    const [clear,setClear] = useState(false)
    const [notData,setNotData] = useState(false)
    // useEffect
    useEffect(() => {
        checkWifi()
    }, [])
    useEffect(() => {
        actionSearch()
    }, [])
    

    useFocusEffect(
        React.useCallback(() => {
          setShowSearch(false)
        },[])
      );
    // function render

    
    const actionSetTextSearch = () => {
        console.log('nanananannaviaivaiviava',props,navigation)
        setShowSearch(true)
    }
    const closePopup = () => {
        try {
            setTimeout(() => setShowSearch(false),Platform.OS == 'ios' ? 0 : 0) 
        } catch (error) {
            
        }
       
    }

    // function handling

    const checkWifi = async () => {
        try {
            const res = await NetInfo.fetch()
            setIsNetwork(res.isConnected)
        } catch (error) {

        }

    }

    const actionClear = () => {
        // setText('')
        setClear(true)
        setShowSearch(true)
    }
    //call api search
    const actionSearch = async () => {
        try {   
            const res = await Api.searchKeyword(text)
            console.log('resresresresresresresres',res.data.response)
            setRefresh(false)
            if(res.data.response == 0){
                setNotData(true)
            }else{
                setArrayResponse(res.data.response)
            }
        } catch (error) {
            setNotData(true)
        }
     
    }

    const renderNoData = () => {
        return(
            <View style={{alignItems:'center',justifyContent:'center',width:width,height:height/2}}>
                <Text style={{color:'#7d7e7e'}}>
                    Không có kết quả tìm kiếm phù hợp
                </Text>
            </View>
        )
    }

    const handleRefesh = () => {
        setRefresh(true)
        actionSearch()
    }

    return (
        <View style={styles.container}>
             {!showSearch && <Header actionClear={actionClear} text={text} actionSetTextSearch={actionSetTextSearch}/>}
             {
                showSearch ? <SearchScreen closePopup={closePopup} clear={clear} textSearch = {text} popup={true}/> :
               isNetwork ? <View style={{ flex: 1 }}>
                <FlatList
                    ListEmptyComponent = { notData && renderNoData()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={handleRefesh}
                        />
                    }
                    data={arrayResponse}
                    keyExtractor={(item, index) => `response_${item.id}`}
                    renderItem={item => <ItemResponse keyword = {text} item={item.item} />
                
                }
                />
             </View> : 
             (
                    <NetworkError /> 
                    ) 
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerHeader: {
        flexDirection: 'row',
        marginTop: MSCALE(Platform.OS == 'ios' ? isIphoneX() ? 56 : 33 : 22),
        marginBottom: MSCALE(16),
        alignItems: 'center'
    },
    imageIcon: {
            width: MSCALE(20),
            height: MSCALE(20),
            marginLeft: MSCALE(11)
    },
   containerInput: {
        flexDirection: 'row',
        height: MSCALE(40),
        borderRadius: MSCALE(20),
        marginLeft: MSCALE(14.2),
        backgroundColor: '#efeff0',
        flex: 1,
        alignItems: 'center',
        marginRight: MSCALE(20)
    },
    containerText: {
        flex: 1,
        height: '100%',
        justifyContent: 'center'
    }
})

export default ResponseScreen
