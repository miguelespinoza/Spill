'use strict';


import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

var DribbbleImage = require("../components/DribbbleImage");
var SaveButton = require("../components/ios/SaveButton");
import GridView from 'react-native-grid-view'
import renderIf from '../components/ViewUtil'
import timeStamp from "../util/time";
var SearchBar = require('react-native-search-bar');

var DribbbleApi = require("../data/api/DribbbleApi");
import DribbbleDB from "../data/db/DribbbleDB";
var cheerio = require('cheerio-without-node-native');

var IMAGES_PER_ROW = 2;

var cachedPage;
var cachedQuery;

class SearchView extends Component {
    constructor(props) {
        super(props);

        cachedQuery = "";
        cachedPage = 1;
        this.state = {
            dataSource: [],
            showSaveButton: false,
            saveButtonActive: false
        };

        // TODO: Bind all the methods that we will be passing as props.
        // example
        /**

         this.renderScene = this.renderScene.bind(this);
         this._addNewTodoList = this._addNewTodoList.bind(this);
         this._onPressTodoList = this._onPressTodoList.bind(this);

         */

        // console.log(DribbbleDB);
        // let filters = DribbbleDB.objects('FilterList');
        // console.log(filters.length);
        // if (filters.length <= 1) {
        //     DribbbleDB.write(() => {
        //         DribbbleDB.create('FilterList', {name: 'PrimaryFilterDB'});
        //     });
        // }
        // console.log(filters, filters.name, filters.items);
        // this.filters = filters;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center'} }>

                    <View style={{flex:1}}>
                        <SearchBar
                            ref='searchBar'
                            placeholder='Search Spill'
                            searchBarStyle={'minimal'}
                            hideBackground={true}
                            onChangeText={this.cacheSearch.bind(this)}
                            onFocus={this.toggleSearchBar.bind(this)}
                        />
                    </View>

                    {renderIf(this.state.showSaveButton)(
                        <SaveButton
                            onSave={this.saveResults.bind(this)}
                            isActive={this.state.saveButtonActive}
                        />
                    )}
                </View>

                <GridView
                    items={this.state.dataSource}
                    enableEmptySections={true}
                    itemsPerRow={IMAGES_PER_ROW}
                    renderItem={SearchView.renderItem}
                    style={styles.grid_view}
                    onEndReached={this.search.bind(this)}
                />
            </View>
        );
    }

    static renderItem(item) {
        return (
            <DribbbleImage
                key={item.id}
                image={item}
            />
        );
    }

    toggleSearchBar() {
        console.log("toggleSearchBar");
        this.setState({
            showSaveButton: !this.state.showSaveButton
        });
    }

    cacheSearch(query) {
        cachedQuery = query;
        cachedPage = 1;

        console.log("cacheSearch, query: " + query);
        if (query === "") {
            this.setState({
                dataSource: [],
                saveButtonActive: false
            });
            return;
        }

        this.setState({
            saveButtonActive: true
        });

        this.search.bind(this);
        this.search();
    }

    search() {

        if (cachedQuery === "") {
            return;
        }

        DribbbleApi.search(cachedQuery, cachedPage)
            .subscribe(
                (results) => {
                    cachedPage = cachedPage + 1;

                    var shots = this.parseShots(results);

                    console.log(shots);
                    if (shots != undefined && shots.length > 0) {

                        this.setState({
                            dataSource: this.state.dataSource.concat(shots)
                        });
                    }

                },
                (err) => {
                    console.log("search Error: " + err);
                }
            );
    }

    saveResults() {
        console.log("saveResults: " + cachedQuery);

        if (cachedQuery === "") {
            return;
        }

        DribbbleDB.saveFilters(cachedQuery);
        
        // console.log(Array.prototype.slice.call(filters));
        // Array.prototype.slice.call(filters).map((val) => {
        //     console.log("filter: " + val);
        // })

        // var plainResults = Array.prototype.map.call(filters, (filter) => {
        //     var object = {};
        //     for (var property of FilterList.properties) {
        //         object[name] = filter[name];
        //     }
        //     return object;
        // });
        //
        // console.log(plainResults);
    }

    // thanks!!!! https://github.com/nickbutcher/plaid/blob/master/app/src/main/java/io/plaidapp/data/api/dribbble/DribbbleSearchConverter.java
    parseShots(results) {
        var $ = cheerio.load(results.toString());
        var shots = [];
        var that = this;

        $('li[id^=screenshot]').each(function(i, elem) {
            var shot = that.parseShot($(this));
            shots.push(shot);
        });

        return shots;
    }

    parseShot(element) {

        var imgUrl = element.find('img').eq(0).attr('src');

        var shot = {
            "id": element.attr('id').replace("screenshot-", ""),
            "title": "test title",
            "images": {
                "teaser": imgUrl,
            }
        };

        return shot;

        /**
         return new Shot.Builder()
             .setId(Long.parseLong(element.id().replace("screenshot-", "")))
             .setHtmlUrl(HOST + element.select("a.dribbble-link").first().attr("href"))
             .setTitle(descriptionBlock.select("strong").first().text())
             .setDescription(description)
             .setImages(new Images(null, imgUrl, null))
             .setAnimated(element.select("div.gif-indicator").first() != null)
             .setCreatedAt(createdAt)
             .setLikesCount(Long.parseLong(element.select("li.fav").first().child(0).text()
             .replaceAll(",", "")))
             .setCommentsCount(Long.parseLong(element.select("li.cmnt").first().child(0).text
             ().replaceAll(",", "")))
             .setViewsCount(Long.parseLong(element.select("li.views").first().child(0)
             .text().replaceAll(",", "")))
             .setUser(parsePlayer(element.select("h2").first()))
             .build();
         */
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 8,
        marginTop: 20
    },
    grid_view: {
        flex: 1
    }
});

module.exports = SearchView;