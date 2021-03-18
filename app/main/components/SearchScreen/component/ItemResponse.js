import React, { memo } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MSCALE } from '../Reponsive';
const host = 'https://www.google.com/s2/favicons?sz=128&domain='
const ItemResponse = ({ item }) => {

    const navigation = useNavigation()
    console.log('ITMEMEMEM', item)
    const indexCut = item?.url?.indexOf('/')
    console.log('indexCutindexCutindexCutindexCutindexCut',indexCut)
    const domain = item?.url?.slice(indexCut+2)
    const iconWeb = host + domain
    return (
        <TouchableOpacity 
        onPress={() => navigation.push('DetailScreen',{url:item?.url})}
        style={styles.container} >
            <View style={{flexDirection:'row',marginTop:MSCALE(15),alignItems:'center'}}>
            <Image
            source={{uri:iconWeb}}
            width={MSCALE(20)}
            height={MSCALE(20)}
            style={{width:MSCALE(20),height:MSCALE(20),marginRight:MSCALE(10)}}
            />
             <Text style={styles.txt_url}>{domain}</Text>
            </View>
           
            <Text 
            numberOfLines={2}
            style={styles.txt_title}>{item.title}</Text>
            <View style={{ flexDirection: 'row',paddingBottom:MSCALE(10),marginTop:MSCALE(15), }}>
                <Text
                    numberOfLines={5}
                    style={[styles.txt_detail,{flex:item.img ? 2/3 : 1}]}>{item?.detail}</Text>
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
        borderTopLeftRadius:MSCALE(10),
        borderTopRightRadius:MSCALE(10),
        backgroundColor:'white',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        paddingLeft: MSCALE(21),
        marginBottom:MSCALE(10)
    },
    txt_url: {
        // paddingTop:MSCALE(15),
        fontFamily:'Roboto-Medium',
        fontWeight:'400',
        fontSize:MSCALE(16)
    },
    txt_title: {
        paddingTop:MSCALE(18),
        fontFamily: 'Roboto-Medium',
        fontWeight: '400',
        fontSize: MSCALE(22),
        color: '#2F59ED'
    },
    txt_detail: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '400',
        fontSize: MSCALE(17),
        paddingRight:MSCALE(20),
        color: 'black',
        // backgroundColor:'red',
        flex: 2 / 3
    },
    img_thumb: {
        flex: 1 / 3,
        width:MSCALE(115),height:MSCALE(121),
        // marginTop:MSCALE(2),
        // marginLeft: MSCALE(20),
        marginRight: MSCALE(20),
        borderRadius: MSCALE(10)
    }
})
export default memo(ItemResponse)