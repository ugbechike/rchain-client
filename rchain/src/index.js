import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Container from './Components/container';

const Index = () => {
	return (
		<BrowserRouter>
			<Container />
		</BrowserRouter>
	)
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
