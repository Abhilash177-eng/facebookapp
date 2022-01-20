import './App.css'
import Login from './login';
import Signup from './signup';
import Home from './home'
import Postcontent from './postcontent';
import Friends from './friends';
import Myprofile from './myprofile';
import Searchresult from './searchresult';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={Postcontent} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/profile" component={Myprofile} />
        <Route exact path="/searchresult" component={Searchresult} />
      </Router>
    </div>
  );
}
export default App;