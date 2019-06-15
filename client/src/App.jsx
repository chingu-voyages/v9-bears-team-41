import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './css/main.css';
import { Icon } from 'semantic-ui-react';

class App extends Component {
    render() {
        return (
            <div id="App">
                <p>React App</p>
                <p>Semantic React Showing Spinner</p>
                <Icon size='massive' loading name='certificate' />
            </div>
        );
    }
}

export default App;
