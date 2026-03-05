import AppLayout from './components/layout/layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Demands from './pages/demands/demands';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Demands />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
