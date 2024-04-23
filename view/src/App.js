import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage} from "./pages/HomePage"
import { ProtectedRoutes } from './middlewares/ProtectedRoutes';
import { UserPage } from './pages/UserPage';
import { ProfessionalPage } from './pages/ProfessionalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/users" element={<UserPage/>}/>
          <Route path="/professionals" element={<ProfessionalPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
