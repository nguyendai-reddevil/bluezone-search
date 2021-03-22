import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MSCALE } from '../Reponsive';
const host = 'https://www.google.com/s2/favicons?sz=128&domain='
const ItemResponse = ({ item }) => {

    const navigation = useNavigation()
    console.log('ITMEMEMEM', item)
    const indexCut = item?.url?.indexOf('/')
    console.log('indexCutindexCutindexCutindexCutindexCut', indexCut)
    const domain = item?.url?.slice(indexCut + 2)
    const iconWeb = host + domain
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.push('DetailScreen', { url: item?.url })}
            style={styles.container} >
            <View style={{ flexDirection: 'row', marginTop: MSCALE(16), alignItems: 'center' }}>
                <Image
                    source={{ uri: iconWeb }}
                    width={MSCALE(20)}
                    height={MSCALE(20)}
                    style={{ width: MSCALE(20), height: MSCALE(20), marginRight: MSCALE(10) }}
                />
                <Text style={styles.txt_url}>{domain}</Text>
            </View>

            <Text
                numberOfLines={2}
                style={styles.txt_title}>{item.title}</Text>
            <View style={{ flexDirection: 'row', paddingBottom: MSCALE(10), marginTop: MSCALE(15), }}>
                <Text
                    numberOfLines={5}
                    style={[styles.txt_detail, { flex: item.img ? 2 / 3 : 1 }]}>{item?.detail}</Text>
                {item?.img && <Image
                    source={{ uri: item.img }}
                    width={MSCALE(115)}
                    height={MSCALE(121)}
                    style={styles.img_thumb}
                />}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderTopLeftRadius: MSCALE(14),
        borderTopRightRadius: MSCALE(14),
        backgroundColor: 'white',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        paddingHorizontal: MSCALE(21),
        marginBottom: MSCALE(12)
    },
    txt_url: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '400',
        fontSize: MSCALE(16),
        color: '#434446'
    },
    txt_title: {
        paddingTop: MSCALE(18),
        fontFamily: 'Roboto-Medium',
        fontWeight: '400',
        fontSize: MSCALE(22),
        color: '#2f59ed',
        flex: 1,
    },
    txt_detail: {
        fontWeight: '400',
        fontFamily: 'Roboto-Medium',
        fontSize: MSCALE(17),
        paddingRight: MSCALE(20),
        color: '#434446',
        flex: 2 / 3
    },
    img_thumb: {
        flex: 1 / 3,
        width: MSCALE(115),
        height: MSCALE(121),
        borderRadius: MSCALE(10)
    }
})
export default memo(ItemResponse)