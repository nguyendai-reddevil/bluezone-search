import React,{ memo } from 'react';
import { View,Text,TextInput,Image,StyleSheet,StatusBar } from 'react-native';
import { FS, MSCALE } from './Reponsive';

const NetworkError = () => {
    return(
        <View>
             <Image
                    resizeMode={'contain'}
                    source={require('./asset/image.png')}
                    style={{width:MSCALE(180.5),height:MSCALE(122),
                        marginTop:MSCALE(14),alignSelf:'center'}}
                    />
           <View style={{marginTop:MSCALE(36),marginLeft:MSCALE(20)}}>
               <Text style={styles.txt_hd}>
                    Không có Internet
               </Text>
               <Text style={[styles.txt_content,{paddingTop:MSCALE(2)}]}>
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
        fontSize:FS(20),
        fontFamily:'OpenSans-SemiBold',
        // fontWeight:'600',
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
        fontSize:FS(15),
        paddingBottom:MSCALE(7)
    },
    txt_dot:{
        fontSize:FS(28),
        paddingBottom:MSCALE(7),
        textAlign:'center',
        color:'grey'
    }
})
export default NetworkError
