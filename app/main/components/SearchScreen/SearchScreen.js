import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import ItemSearch from './component/ItemKeyword';
import ResponseScreen from './ResponseScreen';
import NetworkError from './NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ItemResponse from './component/ItemResponse';
import { getListKeyword, insertKeyword, removeKeywordLast, removeAllHitorySearch, removeKeyword } from '../../../core/db/SqliteDb';

const SearchScreen = ({textSearch,popup,closePopup}) => {

    const navigation = useNavigation()
    console.log('textSearchtextSearchtextSearch',textSearch,popup)
    const [text, setText] = useState(textSearch || '')
    const [arrayKey, setArrayKey] = useState([])
    const [refresh, setRefresh] = useState(false)
    // useEffect

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
                    renderItem={(item) =>
                        <ItemSearch
                            item={item.item}
                            onPress={chooseItem} />}
                />
            </View>
        )
    }

    const setupData = async () => {
        try {
            let listHistory = await getListKeyword(text)
            setArrayKey(listHistory)
        } catch (error) {
            console.log('Setup list data serach error', error)
        }
    }

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: MSCALE(56), alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={closePopup}
                >
                    <Image
                        width={MSCALE(24)}
                        height={MSCALE(24)}
                        resizeMode={'contain'}
                        source={require('./asset/back.png')}
                        style={{ width: MSCALE(24), height: MSCALE(24), marginLeft: MSCALE(15) }}
                    />
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    width: MSCALE(343),
                    height: MSCALE(36),
                    borderRadius: MSCALE(10),
                    marginLeft: MSCALE(20),
                    // marginRight: MSCALE(12),
                    // top: calc(50% - 36px/2);
                    backgroundColor: 'rgba(118, 118, 128, 0.12)'
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
                        autoFocus={popup ? true : false}
                        value={text}
                        style={{
                            width: MSCALE(220),
                            flex: 1,
                            height: MSCALE(Platform.OS == 'ios' ? MSCALE(22) : MSCALE(80)),
                            alignSelf: 'center',
                            color: '#000',
                            marginLeft: MSCALE(7),
                        }}
                        placeholder={'Tra cứu bệnh nhân,tin tức y tế ...'}
                    />
                    <TouchableOpacity
                        onPress={actionClear}
                        style={{ alignItems: 'flex-end', width: MSCALE(20), height: MSCALE(36), justifyContent: 'center', marginRight: MSCALE(20) }}>
                        <Image
                            width={MSCALE(14)}
                            height={MSCALE(14)}
                            resizeMode={'contain'}
                            source={require('./asset/cancel.png')}
                            style={{ width: MSCALE(14), height: MSCALE(14) }}
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

    const chooseItem = (t) => {
        closePopup && closePopup()
        setText(t?.keyword)
        actionSearch(t?.keyword)
    }

    const actionSearch = async (keyword) => {
        closePopup && closePopup()
        let searchKeyword = text;
        if (keyword != undefined && typeof (keyword) == 'string' && keyword?.trim() != '') {
            searchKeyword = keyword
        }
        insertKeyword(searchKeyword)
        searchKeyword != '' && navigation.push('ResponseScreen', { key: searchKeyword })
        setupData()
    }

    const actionChangeText = (t) => {
        setText(t)
    }

    const fillterKeyword = async () => {
        await setupData()
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {renderHeader()}
            {renderDetal()}
        </View>
    )
}
export default memo(SearchScreen)