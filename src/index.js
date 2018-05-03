import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';

ReactDOM.render(<App />, document.getElementById('react-root'));

if (module.hot) {
    module.hot.accept();
}