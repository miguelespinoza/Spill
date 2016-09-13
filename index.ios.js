var React = require('react');
var ReactNative = require('react-native');
var {AppRegistry} = ReactNative;

var Main = require('./app/Main');

AppRegistry.registerComponent('Spill', () => Main);
