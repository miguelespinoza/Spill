var React = require('react');
var ReactNative = require('react-native');
var {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} = ReactNative;

class BottomBar extends React.Component {
    render() {
        return (
          <View style={{backgroundColor:'#de737b', height:50, alignItems:'center', flexDirection:'row', justifyContent:'space-around'}}>
              <TouchableOpacity onPress={() => this.props.onNavigate('home')}>
                  <Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>HOME</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onNavigate('search')}>
                  <Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>SEARCH</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onNavigate('filter')}>
                  <Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>FILTER</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onNavigate('account')}>
                  <Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>ACCOUNT</Text>
              </TouchableOpacity>
          </View>
        );
    }

    onNavigate(scene) {

    }
}

var styles = StyleSheet.create({

})

module.exports = BottomBar;