import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreOnboardHome from './nextzen/preonboardsteps/home/PreOnboardHome';
import Login from './nextzen/preonboardsteps/login/Login';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<PreOnboardHome />} />
          {/* <Route path="/preonboard" element={<PreOnboardHome />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
 
export default App;