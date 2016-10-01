import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var DribbbleLogin = require("../components/DribbbleLogin");
var MainAccountView = require("../components/MainAccountView");

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
    constructor(props) {
        super(props);

        this.state = {
            scene: 'login'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.accountNavigator()}
            </View>
        );
    }

    accountNavigator() {
        switch (this.state.scene) {
            case 'login':
                return (
                    <DribbbleLogin
                        onLoginSuccess = {this.displayMainAccountView.bind(this)}
                    />
                );
            case 'main_view':
                return <MainAccountView/>
        }
    }

    displayMainAccountView() {
        this.setState({scene: 'main_view'})
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