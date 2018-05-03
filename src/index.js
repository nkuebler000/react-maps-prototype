import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
const store = configureStore();

const composedApp = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

ReactDOM.render(composedApp(), document.getElementById('react-root'));

if (module.hot) {
    module.hot.accept();
}