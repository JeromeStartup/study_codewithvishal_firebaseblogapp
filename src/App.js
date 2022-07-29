import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AddEditBlog from './pages/AddEditBlog';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Header from './components/Header';

function App() {

  
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update:id" element={<AddEditBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="+" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
