import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {MainPage, RandomMoviePage, SelectedMoviePage, Page404} from '../pages';
import AppHeader from '../appHeader/AppHeader';


const App = () => {

    return (
        <Router>
            <div className='app'>
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                           <MainPage/>
                        </Route>
                        <Route exact path="/movie/:movieId">
                            <SelectedMoviePage />
                        </Route>
                        <Route exact path="/random">
                            <RandomMoviePage/>
                        </Route>
                        <Route path="*">
                             <Page404/>       
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;
