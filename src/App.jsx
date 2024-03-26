import './App.css';
import Navbar from './Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Home from './Home/Home';
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './Account/Account';
import Statistic from './Statistic/Statistic';



const App = () => {
  return (
    <div className="App">
       <BrowserRouter>
          <Navbar /> 
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/account' element={<Account/>} />
              <Route path='/statistic' element={<Statistic/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/signin' element={<Signin/>} />
          </Routes>
       </BrowserRouter>   
    </div>
  );
}

export default App;
