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
                          <Icon name="md-home"  style={styles.icon}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('search')}>
                          <Icon name="ios-search-outline"  style={styles.icon}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('filter')}>
                          <Icon name="ios-funnel-outline"  style={styles.icon}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.onNavigate('account')}>
                          <Icon name="ios-person-outline"  style={styles.icon}/>
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
    icon: {
        fontSize: 30,
        color: 'grey'
    }
})

module.exports = BottomBar;