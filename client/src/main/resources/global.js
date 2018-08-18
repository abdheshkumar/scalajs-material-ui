window.React = require('react');
window.PropTypes = require('prop-types');
window.React.PropTypes = window.PropTypes;
window.ReactDOM = require('react-dom');

window.mui = require("material-ui");
window.mui.Styles = require("material-ui/styles");
window.mui.SvgIcons = require('material-ui/SvgIcon');
window.mui.Icons = require("material-ui-icons");

window.jQuery = require('jquery');
window.$ = window.jQuery;
window.joint = require("jointjs");
window.V = window.joint.V;
window.g = window.joint.g;

window.mui.DefaultTheme = window.mui.Styles.createMuiTheme({
    MuiGrid: {
        typeItem: {
            padding: '0px',
            margin: '0'
        }
    }
});

require("./css/style.css");

require('react-tap-event-plugin')();
window.logger = (function(){
    var log4javascript = require('log4javascript');
    var consoleAppender = new log4javascript.BrowserConsoleAppender();
    var logger = log4javascript.getDefaultLogger();
    logger.removeAllAppenders();
    logger.addAppender(consoleAppender);
    logger.setLevel(log4javascript.Level.ALL);
    return logger;
})();

/**
 * This function will call material/styles/withStyles component
 * @param styleCreator function that will take input as theme object and return style object
 * @param options component name
 * @param componentClass component class name
 */
window.mui.createComponentWithStyle = function(styleCreator,options,componentClass){
    var t = window.mui.withStyles(styleCreator,options)(componentClass);
    console.log(t);
    return t;
};

