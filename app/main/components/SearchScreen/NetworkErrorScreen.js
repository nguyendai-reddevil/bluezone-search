import React,{ memo } from 'react';
import { View,Text,TextInput,Image,StyleSheet } from 'react-native';
import { MSCALE } from './Reponsive';

const NetworkError = () => {
    return(
        <View>
             <Image
                    width={MSCALE(253)}
                    height={MSCALE(249)}
                    resizeMode={'contain'}
                    source={require('./asset/image.png')}
                    style={{width:MSCALE(253),height:MSCALE(249),marginLeft:MSCALE(20),alignSelf:'center'}}
                    />
           <View style={{marginTop:MSCALE(65),marginLeft:MSCALE(57)}}>
               <Text style={styles.txt_hd}>
                    Không có Internet
               </Text>
               <Text style={styles.txt_content}>
                   Hãy thử:
               </Text>
               <Text style={styles.txt_dot}>•<Text style={styles.txt_content}>  Tắt chế độ trên máy bay</Text></Text>
               <Text style={styles.txt_dot}>•<Text style={styles.txt_content}>  Bật dữ liệu di động hoặc Wi-Fi</Text></Text>
               <Text style={styles.txt_dot}>•<Text style={styles.txt_content}>  Kiểm tra tín hiệu trong khu vực của bạn</Text></Text>
               <Text style={styles.txt_code}>
                   ERR_INTERNET_DISCONECETED
               </Text>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    txt_hd:{
        fontSize:MSCALE(20),
        fontFamily:'Roboto-Medium',
        fontWeight:'400',
        paddingBottom:MSCALE(15)
    },
    txt_code:{
        paddingTop:MSCALE(15),
        fontFamily:'Roboto-Medium',
        fontWeight:'400',
        color:'grey',
    },
    txt_content:{
        color:'grey',
        fontFamily:'Roboto-Medium',
        fontWeight:'400',
        fontSize:MSCALE(14)
    },
    txt_dot:{
        fontSize:MSCALE(20),
        paddingLeft:MSCALE(15),
        color:'grey'
    }
})
export default NetworkError
