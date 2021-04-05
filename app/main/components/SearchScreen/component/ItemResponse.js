import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { useNavigation } from '@react-navigation/native';
import { MSCALE } from '../Reponsive';
const host = 'https://www.google.com/s2/favicons?sz=128&domain='
const ItemResponse = ({ item ,keyword}) => {

    const navigation = useNavigation()
    console.log('ITMEMEMEM', item)
    const indexCut = item?.web_url?.indexOf('/')
    const domain = item?.web_url?.slice(indexCut + 2)
    const iconWeb = host + domain
    return (
        // <View style={{flex:1}}>
            <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.push('DetailScreen', { domain_url: item?.web_url, url:item?.post_url })}
                    style={styles.container} >
                    <View style={{ flexDirection: 'row', marginTop: MSCALE(16), alignItems: 'center' }}>
                        <Image
                            source={{ uri: iconWeb }}
                            style={{width: MSCALE(15), height: MSCALE(15), marginRight: MSCALE(10)}}
                        />
                        <Text style={styles.txt_url}>{domain}</Text>
                       
                    </View>
                             <Highlighter
                                numberOfLines={2}
                                style={styles.txt_title}
                                highlightStyle={{fontFamily:'OpenSans-Bold'}}
                                searchWords={[`${keyword}`]}
                                textToHighlight={item.title}
                                />
                    <View style={{ flexDirection: 'row', paddingBottom: MSCALE(15), marginTop: MSCALE(15), }}>
                        <View style={{width:item?.image_url ?  MSCALE(183) : '100%'}}>
                                <Highlighter
                                numberOfLines={4}
                                style={styles.txt_detail}
                                highlightStyle={{fontFamily:'OpenSans-Bold'}}
                                searchWords={[`${keyword}`]}
                                textToHighlight={item?.description}
                                />
                        </View>
                       
                        {item?.image_url && <Image
                            source={{ uri: item.image_url }}
                            style={styles.img_thumb}
                        />}
                    </View>
                </TouchableOpacity>
        // </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        borderBottomColor:'#eeeeee',
        borderBottomWidth:MSCALE(7),
        borderTopLeftRadius: MSCALE(14),
        borderTopRightRadius: MSCALE(14),
        backgroundColor: 'white',
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 2,
        paddingHorizontal: MSCALE(20),
        marginBottom: MSCALE(12)
    },
    txt_url: {
        fontFamily: 'OpenSans-Regular',
        fontWeight: '400',
        fontSize: MSCALE(12),
        color: '#434446'
    },
    txt_title: {
        paddingTop: MSCALE(15),
        paddingRight:MSCALE(9),
        fontFamily: 'OpenSans-SemiBold',
        fontSize: MSCALE(18),
        color: '#015cd0',
        flex: 1,
    },
    txt_detail: {
        fontFamily: 'OpenSans-Regular',
        fontSize: MSCALE(15),
        color: '#888888',
    },
    img_thumb: {
        width: MSCALE(92),
        height: MSCALE(88),
        marginLeft:MSCALE(40),
        marginTop:MSCALE(10)
    }
})
export default ItemResponse