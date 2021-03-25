import React, { memo, useEffect, useState, useMemo ,useRef} from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator,
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

const dataTest = [
    {
        id: 1,
        url: 'https://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop',
        detail: 'Cô bắt đầu công việc diễn xuất từ trước khi bước chân vào tiểu học. Vào năm 1998, khi chỉ mới 5 tuổi,',
        img: null
    },
    {
        id: 2,
        url: 'https://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop',
        detail: 'Còn Park Eun Bin thì như thế nào? Thoạt nhìn, cô ấy có vẻ là một người gặp nhiều may mắn. Cô bắt đầu công việc diễn xuất từ trước khi bước chân vào tiểu học. Vào năm 1998, khi chỉ mới 5 tuổi, Park Eun Bin đã mơ ước trở thành một diễn viên.',
        img: 'https://vfan-phinf.pstatic.net/20200305_30/15833824891252XO5R_JPEG/ebba68f6-ef44-4ba7-99a4-bbd149a98418.jpg?type=e1920'
    },
    {
        id: 3,
        url: 'http://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop Thời trang kpop Thời trang kpop Thời trang kpop g kpop Thời trang kpop ',
        detail: 'Trang phục thiếu an toàn khiến',
        img: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-09/Nu-than-tuong-co-vong-1-cnph4caxzz8ukoxcsj1iesgpc-1615277518-965-width800height1421.jpg'
    },
    {
        id: 4,
        url: 'https://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop',
        detail: 'Trang phục thiếu an toàn khiến Eun Bin (CLC) cùng một số người đẹp Hàn Quốc gặp sự cố trên sân khấu',
        img: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-09/Nu-than-tuong-co-vong-1-cnph4caxzz8ukoxcsj1iesgpc-1615277518-965-width800height1421.jpg'
    },
    {
        id: 5,
        url: 'https://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop',
        detail: 'Trang phục thiếu an toàn khiến Eun Bin (CLC) cùng một số người đẹp Hàn Quốc gặp sự cố trên sân khấu',
        img: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-09/Nu-than-tuong-co-vong-1-cnph4caxzz8ukoxcsj1iesgpc-1615277518-965-width800height1421.jpg'
    },
    {
        id: 6,
        url: 'https://www.24h.com.vn',
        source: 'https://www.24h.com.vn/nguoi-mau-hoa-hau/nu-than-tuong-gay-thot-tim-vi-ao-tre-nai-va-luat-ngam-mac-chi-ho-1-bo-phan-c214a1232603.html',
        title: 'Thời trang kpop',
        detail: 'Trang phục thiếu an toàn khiến Eun Bin (CLC) cùng một số người đẹp Hàn Quốc gặp sự cố trên sân khấu',
        img: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-09/Nu-than-tuong-co-vong-1-cnph4caxzz8ukoxcsj1iesgpc-1615277518-965-width800height1421.jpg'
    },
]
const ResponseScreen = (props) => {

    const navigation = useNavigation()
    console.log('propspropsprops',props)
    const [text,setText] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const [isNetwork,setIsNetwork] = useState(true)
    const [refresh,setRefresh] = useState(false)
    const [loadmore,setLoadmore] = useState(false)
    const [arrayResponse,setArrayResponse] = useState([])
    // useEffect
    useEffect(() => {
        checkWifi()
    }, [])
    useEffect(() => {
        const keySearch = props?.route?.params?.key
        setText(keySearch)
        actionSearch()
    }, [text])


    // useFocusEffect(
    //     React.useCallback(() => {
    //       setShowSearch(false)
    //     },[])
    //   );
    // function render

    const renderHeader = () => {
        return (
            <View style={styles.containerHeader}>
                <TouchableOpacity style={{ marginLeft: MSCALE(15) }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        width={MSCALE(24)}
                        height={MSCALE(24)}
                        resizeMode={'contain'}
                        source={require('./asset/back.png')}
                        style={{
                            width: MSCALE(24),
                            height: MSCALE(24)
                        }}
                    />
                </TouchableOpacity>

                <View style={styles.containerInput}>
                    <Image
                        resizeMode={'contain'}
                        source={require('./asset/search.png')}
                        style={styles.imageIcon}
                    />

                    <View style={styles.containerText} >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={actionSetTextSearch}
                            style={{
                                justifyContent: 'center'
                            }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: MSCALE(17),
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
                                width: MSCALE(14),
                                height: MSCALE(14),
                            }}
                        />
                    </TouchableOpacity>

                </View>
            </View>

        )
    }
    const actionSetTextSearch = () => {
        console.log('nanananannaviaivaiviava',props,navigation)
        setShowSearch(true)
    }
    const closePopup = () => {
        setShowSearch(false)
    }
    const renderResponse = (data) => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={handleRefesh}
                        />
                    }
                    data={data}
                    keyExtractor={(item, index) => `response_${item.id}`}
                    renderItem={item => <ItemResponse item={item.item} />}
                />
            </View>
        )
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
        setText('')
        setShowSearch(true)
    }
    //call api search
    const actionSearch = () => {
        setRefresh(false)
        setArrayResponse(dataTest)
    }

    const handleRefesh = () => {
        setRefresh(true)
        actionSearch()
    }

    return (
        <View style={styles.container}>
             {!showSearch && renderHeader()}
             {
                showSearch ? <SearchScreen closePopup={closePopup} textSearch = {text} popup={true}/> : !isNetwork ? (
                    <NetworkError /> 
                    ) 
                : renderResponse(arrayResponse)
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerHeader: {
        flexDirection: 'row',
        marginTop: MSCALE(Platform.OS == 'ios' ? isIphoneX() ? 56 : 40 : 24),
        marginBottom: MSCALE(16),
        alignItems: 'center'
    },
    imageIcon: {
        width: MSCALE(22),
        height: MSCALE(22),
        marginHorizontal: MSCALE(16)
    },
    containerInput: {
        flexDirection: 'row',
        height: MSCALE(36),
        borderRadius: MSCALE(10),
        marginLeft: MSCALE(20),
        backgroundColor: '#efeff0',
        flex: 1,
        marginRight: MSCALE(16),
        overflow: 'hidden',
        alignItems: 'center',
        // flexWrap: "wrap",
    },
    containerText: {
        flex: 1,
        height: '100%',
        justifyContent: 'center'
    }
})

export default ResponseScreen
