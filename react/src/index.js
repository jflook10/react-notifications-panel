import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './components/message-list';
import './sass/main.scss'

	

function renderApp(App) {
  ReactDOM.render(<App/>, document.querySelector('.main'));
}

renderApp(MessageList)

if (module.hot) {
  module.hot.accept('./components/message-list', () => {
    const NewApp = require('./components/message-list').default
    renderApp(NewApp)
  })
};