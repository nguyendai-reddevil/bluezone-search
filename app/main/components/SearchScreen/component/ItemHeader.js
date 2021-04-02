
import React, { memo, useEffect, useState, useCallback,useRef } from 'react';
import { View, TextInput, Image, Platform, StyleSheet,TouchableOpacity,Text,Keyboard,ScrollView,UIManager } from 'react-native';
import { MSCALE ,isIphoneX } from '../Reponsive';
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
const ItemHeader = ({actionChangeText,actionClear,actionSearch,closePopup,text}) => {

    const refInput = useRef()
    
    React.useEffect(()=>{
        Keyboard.addListener('keyboardDidHide',_keyboadHide)
        return ()=>{
            Keyboard.removeListener('keyboardDidHide',_keyboadHide)
        }
    },[])
    const _keyboadHide=()=>{
        console.log('_keyboadHide')
    }
    const actionClosePopup = () => {
        try {
            Keyboard.dismiss()
            closePopup()
        } catch (error) {
            
        }
        // refInput.current?.blur()
     
        // alert('ok')
    }
    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity
                onPress={actionClosePopup}
            >
                <Image
                    resizeMode={'contain'}
                    source={require('../asset/back.png')}
                    style={{
                        width: MSCALE(10),
                        height: MSCALE(20),
                    }}
                />
            </TouchableOpacity>

            <View style={styles.containerInput}>
                <Image
                    resizeMode={'contain'}
                    source={require('../asset/search.png')}
                    style={styles.imageSearch}
                />
                <TextInput
                    onSubmitEditing={actionSearch}
                    returnKeyType={'search'}
                    ref={refInput}
                    onChangeText={t => actionChangeText(t)}
                    autoFocus={true}
                    value={text}
                    style={styles.textStyle}
                    placeholderTextColor={'#9c9c9c'}
                    placeholder={'Tra cứu thông tin y tế...'}
                />
                <TouchableOpacity
                    onPress={actionClear}
                    style={styles.containerClear}>
                    <Image
                        resizeMode={'contain'}
                        source={require('../asset/cancel.png')}
                        style={{ width: MSCALE(12), height: MSCALE(12) }}
                    />
                </TouchableOpacity>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        marginTop: MSCALE(Platform.OS == 'ios' ? isIphoneX() ? 56 : 33 : 22),
        alignItems: 'center',
        marginLeft: MSCALE(19.8),
    },
    containerInput: {
        flexDirection: 'row',
        height: MSCALE(40),
        borderRadius: MSCALE(20),
        marginLeft: MSCALE(14.2),
        backgroundColor: '#efeff0',
        flex: 1,
        marginRight: MSCALE(20)
    },
    imageSearch: {
        width: MSCALE(20),
        height: MSCALE(20),
        alignSelf: 'center',
        marginLeft: MSCALE(11)
    },
    textStyle: {
        // width: MSCALE(220),
        fontSize:MSCALE(15),
        fontFamily: 'OpenSans-Regular',
        paddingLeft:MSCALE(5.4),
        paddingRight:MSCALE(16.9),
        flex: 1,
        height: MSCALE(Platform.OS == 'ios' ? MSCALE(22) : MSCALE(80)),
        alignSelf: 'center',
        color: '#000',
        // marginLeft: MSCALE(7),
    },
    containerClear: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: MSCALE(16.9)
    }
})
// export default memo(ItemHeader)
export default (ItemHeader)