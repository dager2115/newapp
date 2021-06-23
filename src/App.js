import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <NavBar lista={["home", "informacion", "catalogo", "contactanos"]}/>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/catalogo">
          <p>Hola estas en el catalogo</p>
        </Route>
        <Route exact path="/informacion">
          <p>Hola estas en informacion</p>
        </Route>
        <Route exact path="/contactanos">
          <p>Hola estas en contactanos</p>
        </Route>
        <Route path="*">
          <p>error 404 not found</p>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
