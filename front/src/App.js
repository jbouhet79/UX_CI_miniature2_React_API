import './App.css';
import { Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion';
import Posts from './pages/Posts';
import { AuthProvider } from './AuthContext';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Miniature</h2>
      </header>
      {/* <Login className="login"/> */}
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Connexion />}></Route>
          <Route path='/posts' element={<Posts />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
