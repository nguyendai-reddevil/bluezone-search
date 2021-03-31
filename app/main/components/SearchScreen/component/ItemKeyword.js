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
                    width:MSCALE(13),height:MSCALE(13),marginRight:MSCALE(17)
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
        height: MSCALE(46.8),
        borderBottomWidth: 1,
        marginRight: MSCALE(19.5),
        flex: 1,
    },
    imageIcon: {
        marginLeft:MSCALE(15),
        width: MSCALE(15),
        height: MSCALE(15)
    },
    textStyle: {
        marginHorizontal: MSCALE(12),
        fontSize: MSCALE(15),
        fontFamily: 'OpenSans-Regular',
        color: '#7d7e7e',
        flex: 1
    }
})

export default memo(ItemSearch)