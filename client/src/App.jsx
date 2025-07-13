import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Join from './pages/Join';
import Challenge from './pages/Challenge';

export default function App() {
  return (
    <div className="p-6">
      <nav className="mb-6 flex gap-4">
        <Link to="/" className="text-blue-500 underline">Home</Link>
        <Link to="/join" className="text-blue-500 underline">Join</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/challenge/:id" element={<Challenge />} />
      </Routes>
    </div>
  );
}