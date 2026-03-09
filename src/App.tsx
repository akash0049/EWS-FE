import AppLayout from './components/layout/layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Demands from './pages/demands/demands';
import HighLevelDemand from './pages/high-level-demand/high-level-demand';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Demands />} />
          <Route path="/high-level-demand" element={<HighLevelDemand />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
