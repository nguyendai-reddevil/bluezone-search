import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, TextInput, Image, Platform, StyleSheet,Text ,Keyboard,StatusBar} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MSCALE ,isIphoneX} from './Reponsive';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ItemSearch from './component/ItemKeyword';
import { getListKeyword, insertKeyword, } from '../../../core/db/SqliteDb';
import ItemHeader from './component/ItemHeader';
const SearchScreen = ({textSearch,popup,closePopup,clear}) => {

    const navigation = useNavigation()
    const [text, setText] = useState(textSearch || '')
    const [arrayKey, setArrayKey] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [firtscreen,setFirtScreen] = useState(true)
    // useEffect

    useEffect(() => {
        setupData()
        clear && setText('')
    }, [])
 
    useEffect(() => {
        fillterKeyword()
    }, [text])

    useFocusEffect(
        useCallback(() => {      
            setupData(text)
            setFirtScreen(true)
        },[text,firtscreen])
    )

    // function render
    const renderDetal = () => {
        return (
            <View style={{ flex: 1, marginLeft: MSCALE(20.5),marginTop:MSCALE(17.3)}}>
                <FlatList
                    style={{flex:1}}
                    data={arrayKey}
                    keyExtractor={(item, index) => `key_${index}`}
            
                    renderItem={(item) =>
                        <ItemSearch
                            popup={popup}
                            item={item.item}
                            keyword={text}
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
        searchKeyword != '' && navigation.push('ResponseScreen', { key: searchKeyword})
        popup && closePopup()

        setFirtScreen(false)
        
        setText('')
        setupData()
    }

    const actionChangeText = (t) => {
        setText(t)
    }

    const fillterKeyword = async () => {
        await setupData()
    }

    return (
        <View style={styles.container}>
            {/* {renderHeader()} */}
            <ItemHeader 
            firtscreen = {firtscreen}
            text={text}
            actionChangeText={actionChangeText} 
            actionClear={actionClear} 
            actionSearch={actionSearch} 
            closePopup={popup ? closePopup : () => {}} />
            {renderDetal()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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

export default SearchScreen