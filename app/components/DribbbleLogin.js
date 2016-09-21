import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    WebView,
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
const host = 'http://www.getremo.com';
// const URL = `${host}/auth/dribbble`
const URL = "https://dribbble.com/session/new";
// const URL = "https://dribbble.com/oauth/authorize"
    // "e57c5114abf35b304afcea1cf56715b99b73f0b1b679a6a7d3bfcd038ab9fb5f" +
    // "&scope=public+write+comment+upload";

// thanks!!! https://gist.github.com/catalinmiron/be093c3ab91589777af5#file-login-js
class DribbbleLogin extends Component {
    render() {
        return(
            <View>
                {this.renderWebView()}
            </View>
        );
    }

    renderWebView() {
        return(
            <View style={styles.container}>
                <WebView
                    ref={'webview'}
                    automaticallyAdjustContentInsets={false}
                    style={{flex: 1, height: height - 71}}
                    source={{uri: URL}}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    scalesPageToFit={true} />
            </View>
        );
    }

    onNavigationStateChange(navState) {
        console.log(navState);
        // catch spill:// callback uri

        if(navState.url.indexOf('/success') !== -1) {

        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = DribbbleLogin;