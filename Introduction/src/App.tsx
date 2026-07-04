import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/_layout/Layout';
import Home from './pages/Home/Home';
import Group from './pages/group/Group';
import Privacy from './pages/privacy/Privacy';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="group/:slug" element={<Group />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
