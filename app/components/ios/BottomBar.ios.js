var React = require('react');
var ReactNative = require('react-native');
var {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} = ReactNative;

import Icon from 'react-native-vector-icons/Ionicons';

class BottomBar extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.bottom_top_border}/>
                    <View style={{height:50, alignItems:'center', flexDirection:'row', justifyContent:'space-around'}}>
                      <TouchableOpacity onPress={() => this.props.onNavigate('home')}>
                          <Icon
                              name="md-home"
                              style={this.props.selected["home"] ? styles.icon_selected : styles.icon_default}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('search')}>
                          <Icon
                              name={this.props.selected["search"] ? "ios-search" : "ios-search-outline"}
                              style={this.props.selected["search"] ? styles.icon_selected : styles.icon_default}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('filter')}>
                          <Icon
                              name={this.props.selected["filter"] ? "ios-funnel" :"ios-funnel-outline"}
                          style={this.props.selected["filter"] ? styles.icon_selected : styles.icon_default}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('account')}>
                          <Icon
                              name={this.props.selected["account"] ? "ios-person" : "ios-person-outline"}
                              style={this.props.selected["account"] ? styles.icon_selected : styles.icon_default}/>
                      </TouchableOpacity>
                    </View>
            </View>
        );
    }

    onNavigate(scene) {

    }
}

var styles = StyleSheet.create({
    bottom_top_border: {
        borderTopWidth:1,
        borderTopColor: '#e0e0e0',
        marginLeft: 16,
        marginRight: 16
    },
    icon_default: {
        fontSize: 30,
        color: 'grey'
    },
    icon_selected: {
        fontSize: 30,
        color: '#A5CCCA'
    }
})

module.exports = BottomBar;