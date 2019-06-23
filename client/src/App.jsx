import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './css/main.css';
import { AppContext } from './AppContext';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import EntryPage from './components/pages/EntryPage';
import EntryListPage from './components/pages/EntryListPage';
import UploadPage from './components/pages/UploadPage';

const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div id="App">
                <AppContext.Provider value={{history: history}}>
                    <Router history={history}>
                        <Route exact path='/' component={EntryListPage} />
                        <Route path='/entry' component={EntryPage} />
                        <Route path='/upload' component={UploadPage} />
                    </Router>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
