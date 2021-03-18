import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import ItemSearch from './component/ItemKeyword';
import ResponseScreen from './ResponseScreen';
import NetworkError from './NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ItemResponse from './component/ItemResponse';
import { getListKeyword, insertKeyword, removeKeywordLast, removeAllHitorySearch, removeKeyword } from '../../../core/db/SqliteDb';
const arrayTest = [
    { id: 1, content: 'cách cài đặt bluezone' },
    { id: 2, content: 'cách cài đặt ứng dụng sức khoẻ bluezone khoẻ khoe khoe' },
    { id: 3, content: '24h' },
    { id: 4, content: 'tin tức 48h qua' },
    { id: 5, content: 'cách sử dụng bluezone' },
    { id: 6, content: 'làm sao sử dụng bluezone' },
    { id: 7, content: 'tác dụng của bluezone' },
    { id: 8, content: 'số người cài đặt bluezone' }
]
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
const SearchScreen = () => {
    const [text, setText] = useState('')
    const [arrayKey, setArrayKey] = useState([])
    const [isNetwork, setIsNetwork] = useState(true)
    const [showResponse, setShowResponse] = useState(false)
    const [arrayResponse, setArrayResponse] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loadmore, setLoadmore] = useState(false)

    // useEffect
    useEffect(() => {
        checkWifi()
        setArrayKey(arrayTest)
    }, [])

    useEffect(() => {
        setupData()
    }, [])

    useEffect(() => {
        fillterKeyword()
    }, [text])

    // function render
    const renderDetal = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ marginLeft: MSCALE(57) }}
                    data={arrayKey}
                    keyExtractor={(item, index) => `key_${index}`}
                    renderItem={(item) => <ItemSearch item={item.item} />}
                />
            </View>
        )
    }

    const setupData = async () => {
        try {
            // let k = await removeKeywordLast()
            let listHistory = await getListKeyword('')

            console.log('LISTTT', listHistory)
        } catch (error) {

        }
    }

    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row', marginTop: MSCALE(Platform.OS == 'ios' ? 56 : 14),
                marginBottom: showResponse ? MSCALE(10) : MSCALE(0),
            }}>
                <Image
                    width={MSCALE(24)}
                    height={MSCALE(24)}
                    resizeMode={'contain'}
                    source={require('./asset/back.png')}
                    style={{ width: MSCALE(24), height: MSCALE(24), marginLeft: MSCALE(15), alignSelf: 'center' }}
                />
                <View style={{
                    flexDirection: 'row',
                    width: MSCALE(343),
                    // height: MSCALE(36),
                    borderRadius: MSCALE(10),
                    marginLeft: MSCALE(20),
                    // marginRight: MSCALE(12),
                    // top: calc(50% - 36px/2);
                    backgroundColor: '#efeff0',
                    alignItems: 'center'
                }}>
                    <Image
                        width={MSCALE(24)}
                        height={MSCALE(22)}
                        resizeMode={'contain'}
                        source={require('./asset/search.png')}
                        style={{ width: MSCALE(24), height: MSCALE(22), alignSelf: 'center', marginLeft: MSCALE(11) }}
                    />
                    <TextInput
                        onSubmitEditing={actionSearch}
                        returnKeyType={'search'}
                        onChangeText={t => actionChangeText(t)}
                        onFocus={() => setShowResponse(false)}
                        onSubmitEditing={actionSearch}
                        value={text}
                        style={{
                            lineHeight: MSCALE(36),
                            width: MSCALE(221),
                            height: MSCALE(36),
                            alignSelf: 'center',
                            color: '#000',
                            marginLeft: MSCALE(7),
                        }}
                        placeholder={'Tra cứu bệnh nhân,tin tức y tế...'}
                    />
                    <TouchableOpacity
                        onPress={actionClear}
                        style={{ alignItems: 'flex-end', width: MSCALE(20), height: MSCALE(36), justifyContent: 'center', marginLeft: MSCALE(49) }}>
                        <Image
                            width={MSCALE(14)}
                            height={MSCALE(14)}
                            resizeMode={'contain'}
                            source={require('./asset/cancel.png')}
                            style={{ width: MSCALE(14), height: MSCALE(14), marginLeft: MSCALE(57) }}
                        />
                        {/* <Text style={{alignSelf:'center'}}>abc</Text> */}
                    </TouchableOpacity>

                </View>
            </View>

        )
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
                    ListFooterComponent={renderIndicatorLoadingMore}
                    onEndReachedThreshold={0.01}
                    onEndReached={handleLoadMore}
                />
            </View>
        )
    }
    const renderIndicatorLoadingMore = useMemo(() => {
        if (loadmore) {

            return (
                <View style={{
                    height: MSCALE(50),
                    alignItems: 'center',
                    paddingTop: MSCALE(8)
                }}>
                    <ActivityIndicator color={'grey'} />
                </View>
            )
        }
        return <View style={{ height: MSCALE(30) }} />
    }, [loadmore])

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
    }
    const actionSearch = () => {
        // setRefresh(false)
        // setLoadmore(false)
        // setShowResponse(true)
        // setArrayResponse(dataTest)
        saveKeywordToSqlite()
    }

    const saveKeywordToSqlite = async () => {
        console.log('BAT DAU SEWACGH')
        await insertKeyword(text)
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
    const handleRefesh = () => {
        setRefresh(true)
        actionSearch()
    }
    const handleLoadMore = () => {
        setLoadmore(true)
        actionSearch()
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {renderHeader()}
            {!showResponse ? renderDetal() : renderResponse(arrayResponse)}
            {/* <NetworkError/> */}
        </View>
    )
}
export default memo(SearchScreen)