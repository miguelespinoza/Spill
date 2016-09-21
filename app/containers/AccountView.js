import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var DribbbleLogin = require("../components/DribbbleLogin");

var dribbblePink = '#EA4D89';

// class DribbbleLogInButton extends Component {
//     render() {
//         return(
//             <TouchableOpacity style={{flexDirection: 'row', backgroundColor: dribbblePink, width: 300, alignItems:'center'}}>
//                 <Icon name="logo-dribbble" style={{fontSize: 38, color: 'white', marginRight: 8}}/>
//                 <Text style={{color: 'white', fontWeight:'bold', fontSize: 18, justifyContent: 'center'}}>LOG IN TO DRIBBBLE</Text>
//             </TouchableOpacity>
//         );
//     }
// }

class AccountView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DribbbleLogin/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 8,
        marginTop: 20
    }
});

module.exports = AccountView;