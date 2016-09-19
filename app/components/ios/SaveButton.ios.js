var React = require('react');
var ReactNative = require('react-native');
var {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} = ReactNative;

class SaveButton extends React.Component {
    render() {
        return(
            <TouchableOpacity
                onPress={() => this.props.onSave()}
                style={styles.container}>

                <Text style={{color: this.props.isActive ? '#0076FF' : 'gray', fontSize: 16}}>
                    Save
                </Text>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginRight: 8
    },
    grid_view: {
        flex: 1
    }
});

module.exports = SaveButton;