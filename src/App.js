import './App.css';
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter, 
  Switch, 
  Route, 
  Redirect} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Redirect exact from="/" to="/home" />
        {/* <Route exact path="/home" component={Home}/> */}
        <Route exact path="/home/:id">
          <Home/>
        </Route>
        <Route exact path="/home">
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
