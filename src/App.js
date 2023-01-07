import Navbar from './components/navbar';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Random from './pages/Random';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="component">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/random" element={<Random />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
