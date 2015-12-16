import style from "./style.styl";
import React from 'react';
import ReactDOM from 'react-dom';
var App = require('./components/App.js').default;

function render(){
	ReactDOM.render(<App/>, document.getElementById('Content'));
}


if(module.hot) {
	module.hot.accept("./components/App.js", function() {
		App = require('./components/App.js').default
		render();
	});
}

render();