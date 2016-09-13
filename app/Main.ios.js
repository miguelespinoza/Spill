var React = require('react');
var ReactNative = require('react-native');
var {
	StatusBar,
	Image,
	Dimensions,
	View,
	Text,
	StyleSheet
} = ReactNative;

var HomeView = require("./containers/HomeView");
var SearchView = require("./containers/SearchView");
var FilterView = require("./containers/FilterView");
var AccountView = require("./containers/AccountView");

var DribbbleImage = require("./components/DribbbleImage");
var BottomBar = require("./components/ios/BottomBar");

import GridView from 'react-native-grid-view'

var Rx = require('@reactivex/rxjs');
var DribbbleApi = require("./data/api/DribbbleApi");

const Containers = [HomeView, SearchView, FilterView, AccountView];

var IMAGES_PER_ROW = 2;

var cachedPage;
var shotsSubscription;

class GridItem extends React.Component {
    render() {
        return (
            <View style={styles.photo}>
                <Text>{this.props.item}</Text>
            </View>
        )
    }
}

let width = Dimensions.get('window').width

class Main extends React.Component {
    constructor(props) {
		super(props);

        cachedPage = 1;
        this.state = {
            dataSource: []
        };


    }

	componentDidMount() {
		this.popularShots = this.popularShots.bind(this)
		this.popularShots()
	}

    render() {
        return (
			<View style={styles.background}>

				<GridView
	                items={this.state.dataSource}
					enableEmptySections={true}
	                itemsPerRow={IMAGES_PER_ROW}
	                renderItem={this.renderItem}
	                style={styles.container}
	                onEndReached={this.popularShots.bind(this)}
	                />

				<BottomBar/>
			</View>
        )
    }

    renderItem(item) {
		return (
			<DribbbleImage
				key={item.id}
				image={item}
			/>
		);
	}

    popularShots() {
        console.log("popularShots GET, page: " + cachedPage);

        if (shotsSubscription != null && !shotsSubscription.isStopped) {
    		return;
    	}

        shotsSubscription = DribbbleApi.popularShotsGET(cachedPage)
            .subscribe(
				(shots) => {
					cachedPage = cachedPage + 1;
					this.setState({
					  dataSource: this.state.dataSource.concat(shots),
					  loaded: true,
				  	});

					shotsSubscription.unsubscribe();
				},
				(err) => {
					console.log("popularShotsGET Error: " + err);
				}
			);
    }

}

var styles = StyleSheet.create({
	background: {
		flex: 1
	},
	container: {
		flex: 1,
		alignSelf: 'stretch',
		borderRadius: 8,
		marginTop: 20
	},
    photo: {
        height: 150,
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
})

module.exports = Main;
