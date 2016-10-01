import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

import DribbbleDB from "../data/db/DribbbleDB";

class MainAccountView extends Component {
    render() {
        return(
            <ScrollView>
                {this.renderMainAccountView()}
            </ScrollView>
        );
    }

    renderMainAccountView() {
        var account = DribbbleDB.getDribbbleAccount();

        console.log("account", account.dribbble_avatar_url);
        if (account != null && account.id != null) {
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.circular_image_view}
                        source={{uri: account.dribbble_avatar_url}}
                    />

                    <Text style={styles.name_text}>
                        {account.name}
                    </Text>

                    <Text style={styles.logout_text}>
                        Log Out
                    </Text>

                    <View style={styles.bottom_top_border}/>

                    <Text style={styles.options_text}>
                        About
                    </Text>
                </View>
            );
        }

        console.error("Account does not exists");
        // account does not exists
        // TODO: should it even reach this? MainAccountView should only be rendered if account exists
        return (
            <Text>Account does not exists</Text>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    circular_image_view: {
        height: 130,
        borderRadius: 65,
        width: 130,
        marginTop: 12,
        marginBottom: 12,
        alignSelf : 'center'
    },
    name_text: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf : 'center'
    },
    logout_text: {
        fontSize: 20,
        color: 'red',
        marginTop: 8,
        alignSelf : 'center'
    },
    options_text: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    bottom_top_border: {
        borderTopWidth:1,
        borderTopColor: '#e0e0e0',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 8,
        marginBottom: 14,
    },

});

module.exports = MainAccountView;