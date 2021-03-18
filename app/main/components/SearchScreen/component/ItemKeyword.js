import React,{ memo } from 'react';
import {useNavigation} from '@react-navigation/native';
import { View,Text,Image,TouchableOpacity } from 'react-native';
import {MSCALE} from '../Reponsive';

const ItemSearch = ({item,onPress}) => {
    const navigation = useNavigation()
    console.log('itetmemtemtmetetmemtmemte',item)
    return(
        <TouchableOpacity 
        onPress={() => navigation.push('ResponseScreen',{key: item.content})}
        style={{flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#E0E0E0',
        height:MSCALE(71),borderBottomWidth:1}}>
            <Image
                source={require('../asset/lock.png')}
                resizeMode={'contain'}
                width={MSCALE(18)}
                height={MSCALE(18)}
                style={{width:MSCALE(18),height:MSCALE(18)}}
            />
            <Text
            numberOfLines={1}
            style={{paddingLeft:MSCALE(28),fontSize:MSCALE(17), 
                fontFamily: 'Roboto-Medium',fontWeight:'400'}}>
                {item.content}
            </Text>
            <View style={{position:'absolute',right:0,backgroundColor:'white'}}>
            <Image
                source={require('../asset/choose.png')}
                resizeMode={'contain'}
                width={MSCALE(18)}
                height={MSCALE(18)}
                style={{
                    // position:'absolute',
                    // right:MSCALE(29.68),
                    marginRight:MSCALE(29.68),
                    marginLeft:MSCALE(15),
                    width:MSCALE(18),
                    height:MSCALE(18)}}
            />
            </View>
           
        </TouchableOpacity>
    )
}
export default memo(ItemSearch)