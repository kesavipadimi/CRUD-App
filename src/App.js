import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './Redux/Store';
import Profiles from './Components/Profiles/profiles';
import ViewProfile from './Components/Profiles/viewProfile';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Route exact path="/" component={Profiles}/>
    <Route path="/ViewProfile" component={ViewProfile}/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
