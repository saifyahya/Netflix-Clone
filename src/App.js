import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import FavList from './Components/FavList'
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/fav' element={<FavList />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
