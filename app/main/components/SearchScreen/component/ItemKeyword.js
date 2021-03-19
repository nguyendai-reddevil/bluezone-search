import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MSCALE } from '../Reponsive';

const ItemSearch = ({ item, onPress }) => {
    const onSelectValue = () => {
        if (onPress) {
            onPress(item)
        }
    }

    return (
        <TouchableOpacity
            onPress={onSelectValue}
            style={styles.container}>

            <FastImage
                source={require('../asset/lock.png')}
                resizeMode={'contain'}
                style={styles.imageIcon}
            />

            <Text
                numberOfLines={1}
                style={styles.textStyle}>
                {item?.keyword}
            </Text>

            <FastImage
                source={require('../asset/choose.png')}
                resizeMode={'contain'}
                style={[styles.imageIcon, {
                }]}
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E0E0E0',
        height: MSCALE(71),
        borderBottomWidth: 1,
        marginRight: MSCALE(40),
        flex: 1
    },
    imageIcon: {
        width: MSCALE(18),
        height: MSCALE(18)
    },
    textStyle: {
        marginHorizontal: MSCALE(28),
        fontSize: MSCALE(17),
        fontFamily: 'Roboto-Medium',
        fontWeight: '400',
        color: 'black',
        flex: 1
    }
})

export default memo(ItemSearch)