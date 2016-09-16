import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

var SearchBar = require('react-native-search-bar');

var DribbbleApi = require("../data/api/DribbbleApi");
var cheerio = require('cheerio-without-node-native');

var cachedPage;

class SearchView extends Component {
    constructor(props) {
        super(props);

        cachedPage = 1;
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    ref='searchBar'
                    placeholder='Search'
                    onChangeText={this.search.bind(this)}
                />
            </View>
        );
    }

    search(query) {
        DribbbleApi.search(query, cachedPage)
            .subscribe(
                (results) => {
                    this.parseShots(results);
                },
                (err) => {
                    console.log("search Error: " + err);
                }
            );
    }

    // thanks!!!! https://github.com/nickbutcher/plaid/blob/master/app/src/main/java/io/plaidapp/data/api/dribbble/DribbbleSearchConverter.java
    parseShots(results) {
        var $ = cheerio.load(results.toString());

        console.log("cheerio", );

        var shots = [];

        var that = this;
        console.log("parseShots");
        $('li[id^=screenshot]').each(function(i, elem) {\
            var shot = that.parseShot($(this));
            shots.push(shot);
        });
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
    }
});

module.exports = SearchView;