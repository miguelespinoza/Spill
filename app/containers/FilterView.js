import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import DribbbleDB from "../data/db/DribbbleDB";
import Icon from 'react-native-vector-icons/Ionicons';

var filtersFromDB;  // a live-updating value
var dribbblePink = '#EA4D89';

class FilterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };
    }

    componentDidMount() {
        filtersFromDB = DribbbleDB.getFilters();
        this.setState({
            filters: filtersFromDB
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon name="logo-dribbble" style={{fontSize: 42, color: dribbblePink}}/>
                </View>
                {this.renderFilters()}
            </View>
        );
    }

    renderFilters() {
        return this.state.filters.map((filter) => {
            return(
                <View key={filter.id} style={styles.filter_row}>
                    <Text
                        style={[styles.filter_font, {color: filter.visible ? dribbblePink : "grey"}]}>
                        {filter.name}
                    </Text>
                    <View style={[styles.filter_row, {flex: 1, justifyContent: 'flex-end'}]}>
                        <Icon
                            onPress={() => {
                                DribbbleDB.updateFilter(
                                    filter,
                                    {   // newFilter
                                        name: filter.name,
                                        visible: !filter.visible
                                    }
                                );

                                this.setState({
                                    filters: filtersFromDB
                                })
                            }}
                            name={filter.visible ? 'ios-eye' : 'ios-eye-off'}
                            style={[styles.filter_visible_icon, {color: filter.visible ? dribbblePink : "grey"}]}/>
                        <Icon
                            name='md-close'
                            style={[styles.filter_close_icon, {color: filter.visible ? dribbblePink : "grey"}]}/>
                    </View>
                </View>

            );
        });


    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 8,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16
    },
    filter_row: {
        flexDirection:'row',
    },
    filter_font: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    filter_visible_icon    : {
        fontSize  : 32,
        marginRight : 16,
        alignSelf : 'center'
    },
    filter_close_icon : {
        fontSize  : 32,
        alignSelf : 'center'
    }
});

module.exports = FilterView;