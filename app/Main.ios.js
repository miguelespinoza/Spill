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

var BottomBar = require("./components/ios/BottomBar");

const Containers = [HomeView, SearchView, FilterView, AccountView];

var defaultScene = 'home';

class Main extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			scene: 'account'
		};
    }

	componentDidMount() {
	}

    render() {
        return (
			<View style={styles.background}>
				{this.renderScene()}
				<BottomBar
					onNavigate={this.setScene.bind(this)}
					style={styles.bottom_nav}/>
			</View>
        )
    }

    setScene(newScene) {
		this.setState({
			scene: newScene
		});
	}

    renderScene() {
		switch (this.state.scene) {
			case 'home':
				return <HomeView/>
			case 'search':
				return <SearchView/>
			case 'filter':
				return <FilterView/>
			case 'account':
				return <AccountView/>
		}
	}

}

var styles = StyleSheet.create({
	background: {
		flex: 1
	},
	bottom_nav: {
		flex: 1
	}
})

module.exports = Main;
