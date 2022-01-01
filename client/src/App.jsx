import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MyProfile from './views/MyProfile';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Provider from './context/Provider';
import PublicationById from './views/PublicationById';
import SignUp from './views/SignUp';
import Login from './views/Login';
import Settings from './views/Settings'
import About from './views/About'

function App() {
  return (
    <Router>
      <Provider>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/sign-up" element={<SignUp/>}/> 
          <Route exact path="/myprofile" element={<MyProfile/>}/> 
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/publication/:id" element={<PublicationById/>}/> 
          <Route exact path="/settings" element={<Settings/>}/> 
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
