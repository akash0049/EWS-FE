import AppLayout from './components/layout/layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Demands from './pages/demands/demands';
import CreateNewDemand from './pages/demands/components/create-new-demand/create-new-demand';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Demands />} />
          <Route path="/demands/create" element={<CreateNewDemand />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
