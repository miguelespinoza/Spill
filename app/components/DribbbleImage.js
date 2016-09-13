'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

class DribbbleImage extends Component {
	render() {
		return (
			<View style={styles.image} >
				<Image
					source={{uri: this.props.image.images.teaser}}
					style={styles.thumbnail}
				/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
  image: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  thumbnail: {
    flex: 1,
	alignItems: 'center',
	height: 150,
	width: 190,
  },
});

module.exports = DribbbleImage;
