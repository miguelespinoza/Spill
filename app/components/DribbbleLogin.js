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
// const URL = "https://dribbble.com/session/new";
const URL = "https://dribbble.com/oauth/authorize?client_id=" +
    "e57c5114abf35b304afcea1cf56715b99b73f0b1b679a6a7d3bfcd038ab9fb5f" +
    "&scope=public+write+comment+upload";


var DribbbleApi = require("../data/api/DribbbleApi");
import DribbbleDB from "../data/db/DribbbleDB";
import renderIf from '../components/ViewUtil'

// thanks!!! https://gist.github.com/catalinmiron/be093c3ab91589777af5#file-login-js
class DribbbleLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDribbbleLogin: true
        }
    }

    render() {
        return(
            <View>
                {renderIf(this.state.showDribbbleLogin)(
                    this.renderWebView()
                )}
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

        console.log(navState.url.indexOf('spill://oauth-callback?'));

        if(navState.url.indexOf('spill://oauth-callback?') !== -1) {
            var oauthMap = this.trimOAuthResults(navState.url);

            // access_denied
            if ("error" in oauthMap) {
                console.log("Dribbble Login Failed/Denied");
            }

            // success
            if ("code" in oauthMap) {
                console.log("Dribbble Login Success");
                this.setState({
                    showDribbbleLogin: false
                });
                this.getAccessToken(oauthMap["code"]);
            }
        }
    }

    trimOAuthResults(url) {
        console.log("trimOAuthResults");
        var params = url.split('?')[1].split('&');

        console.log(params);

        var oauthMap = {};

        params.map((val) => {
            var keyVal = val.split('=');
           oauthMap[keyVal[0]] = keyVal[1];
        });

        return oauthMap;
    }

    getAccessToken(code) {
        DribbbleApi.accountOAuth(code)
            .subscribe(
                (result) => {
                    console.log("getAccessToken Success");
                    this.getAuthUser(result);
                },
                (err) => {
                    console.log("getAccessToken Error: " + err);
                }
            );
    }

    getAuthUser(account) {
        DribbbleApi.getAuthUser(account["access_token"])
            .subscribe(
                (result) => {
                    console.log("getAuthUser Success");
                    account["id"] = result["id"];
                    account["name"] = result["name"];
                    account["avatar_url"] = result["avatar_url"];


                    console.log(account["id"]);
                    console.log(account["name"]);
                    console.log(account["avatar_url"]);

                    this.saveUserAccount(account);
                },
                (err) => {
                    console.log("getAuthUser Error: " + err);
                }
            );
    }

    saveUserAccount(account) {
        DribbbleDB.saveDribbbleAccount(account);
        // notifyUI
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = DribbbleLogin;