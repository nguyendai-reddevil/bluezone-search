import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, Image, Keyboard, RefreshControl, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE } from './Reponsive';
import { useNavigation } from '@react-navigation/native';
import ItemSearch from './component/ItemKeyword';
import ResponseScreen from './ResponseScreen';
import NetworkError from './NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ItemResponse from './component/ItemResponse';
import { getListKeyword, insertKeyword, } from '../../../core/db/SqliteDb';

const SearchScreen = (props) => {

    const navigation = useNavigation()
    const keySearch = props?.route?.params?.key
    const [text, setText] = useState(keySearch || '')
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
            <View style={styles.containerHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        width={MSCALE(24)}
                        height={MSCALE(24)}
                        resizeMode={'contain'}
                        source={require('./asset/back.png')}
                        style={{
                            width: MSCALE(24),
                            height: MSCALE(24),
                            marginLeft: MSCALE(15)
                        }}
                    />
                </TouchableOpacity>

                <View style={styles.containerInput}>
                    <Image
                        width={MSCALE(24)}
                        height={MSCALE(22)}
                        resizeMode={'contain'}
                        source={require('./asset/search.png')}
                        style={styles.imageSearch}
                    />
                    <TextInput
                        onSubmitEditing={actionSearch}
                        returnKeyType={'search'}
                        onChangeText={t => actionChangeText(t)}
                        autoFocus={text ? true : false}
                        value={text}
                        style={styles.textStyle}
                        placeholder={'Tra cứu bệnh nhân, tin tức y tế ...'}
                    />
                    <TouchableOpacity
                        onPress={actionClear}
                        style={styles.containerClear}>
                        <Image
                            width={MSCALE(14)}
                            height={MSCALE(14)}
                            resizeMode={'contain'}
                            source={require('./asset/cancel.png')}
                            style={{ width: MSCALE(14), height: MSCALE(14) }}
                        />
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
        setText(t?.keyword)
        actionSearch(t?.keyword)
    }

    const actionSearch = async (keyword) => {
        let searchKeyword = text;
        if (keyword != undefined && typeof (keyword) == 'string' && keyword?.trim() != '') {
            searchKeyword = keyword
        }
        await insertKeyword(searchKeyword)
        searchKeyword != '' && navigation.push('ResponseScreen', { key: searchKeyword })
        setupData()
        await getLIIIITmp()
    }

    const actionChangeText = (t) => {
        setText(t)
    }

    const fillterKeyword = async () => {
        await setupData()
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderDetal()}
            {/* <NetworkError/> */}
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
        marginTop: MSCALE(Platform.OS == 'ios' ? 56 : 24),
        alignItems: 'center'
    },
    containerInput: {
        flexDirection: 'row',
        height: MSCALE(36),
        borderRadius: MSCALE(10),
        marginLeft: MSCALE(20),
        backgroundColor: '#efeff0',
        flex: 1,
        marginRight: MSCALE(16)
    },
    imageSearch: {
        width: MSCALE(24),
        height: MSCALE(22),
        alignSelf: 'center',
        marginLeft: MSCALE(11)
    },
    textStyle: {
        width: MSCALE(220),
        flex: 1,
        height: MSCALE(Platform.OS == 'ios' ? MSCALE(22) : MSCALE(80)),
        alignSelf: 'center',
        color: '#000',
        marginLeft: MSCALE(7),
    },
    containerClear: {
        alignItems: 'flex-end',
        width: MSCALE(20),
        height: MSCALE(36),
        justifyContent: 'center',
        marginRight: MSCALE(20)
    }
})

export default memo(SearchScreen)