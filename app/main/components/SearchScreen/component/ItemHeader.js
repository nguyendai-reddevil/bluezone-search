
import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, TextInput, Image, Platform, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { MSCALE ,isIphoneX } from '../Reponsive';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
const ItemHeader = ({actionChangeText,actionClear,actionSearch,closePopup,text}) => {

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity
                onPress={closePopup}
            >
                <Image
                    width={MSCALE(24)}
                    height={MSCALE(24)}
                    resizeMode={'contain'}
                    source={require('../asset/back.png')}
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
                    source={require('../asset/search.png')}
                    style={styles.imageSearch}
                />
                <TextInput
                    onSubmitEditing={actionSearch}
                    returnKeyType={'search'}
                    onChangeText={t => actionChangeText(t)}
                    autoFocus={true}
                    value={text}
                    style={styles.textStyle}
                    placeholderTextColor={'#979797'}
                    placeholder={'Tra cứu bệnh nhân, tin tức y tế ...'}
                />
                <TouchableOpacity
                    onPress={actionClear}
                    style={styles.containerClear}>
                    <Image
                        width={MSCALE(14)}
                        height={MSCALE(14)}
                        resizeMode={'contain'}
                        source={require('../asset/cancel.png')}
                        style={{ width: MSCALE(14), height: MSCALE(14) }}
                    />
                </TouchableOpacity>

            </View>
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
export default memo(ItemHeader)