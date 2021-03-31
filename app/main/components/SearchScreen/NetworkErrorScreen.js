import React,{ memo } from 'react';
import { View,Text,TextInput,Image,StyleSheet } from 'react-native';
import { MSCALE } from './Reponsive';

const NetworkError = () => {
    return(
        <View>
             <Image
                    resizeMode={'contain'}
                    source={require('./asset/image.png')}
                    style={{width:MSCALE(180.5),height:MSCALE(122),
                        marginTop:MSCALE(20),alignSelf:'center'}}
                    />
           <View style={{marginTop:MSCALE(34),marginLeft:MSCALE(20)}}>
               <Text style={styles.txt_hd}>
                    Không có Internet
               </Text>
               <Text style={styles.txt_content}>
                   Hãy thử:
               </Text>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.txt_dot}>•</Text>
                <Text style={styles.txt_content}>  Tắt chế độ trên máy bay</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.txt_dot}>•</Text>
                <Text style={styles.txt_content}>  Bật dữ liệu di động hoặc Wi-Fi</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.txt_dot}>•</Text>
                <Text style={styles.txt_content}>  Kiểm tra tín hiệu trong khu vực của bạn</Text>
               </View>
               {/* <Text style={styles.txt_code}>
                   ERR_INTERNET_DISCONECETED
               </Text> */}
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    txt_hd:{
        fontSize:MSCALE(20),
        fontFamily:'OpenSans-Regular',
        fontWeight:'600',
        color:'#1e1e1e',
        paddingBottom:MSCALE(30)
    },
    txt_code:{
        paddingTop:MSCALE(15),
        fontFamily:'OpenSans-Regular',
        fontWeight:'400',
        color:'grey',
    },
    txt_content:{
        color:'#888888',
        fontFamily:'OpenSans-Regular',
        fontWeight:'400',
        fontSize:MSCALE(15),
        paddingBottom:MSCALE(14)
    },
    txt_dot:{
        fontSize:MSCALE(20),
        paddingLeft:MSCALE(14),
        paddingBottom:MSCALE(15),
        color:'grey'
    }
})
export default NetworkError
