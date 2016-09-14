import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

class AccountView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ACCOUNT</Text>
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