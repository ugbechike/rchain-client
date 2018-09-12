import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Container from './Components/container';
import registerServiceWorker from './registerServiceWorker';

const Index = () => {
    return (
        <BrowserRouter>
            <Container />
        </BrowserRouter>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
