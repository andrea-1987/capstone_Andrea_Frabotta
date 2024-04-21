import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage} from "./pages/HomePage"
import { ProteCtedRoutes } from './middlewares/ProtectedRoutes';
import { UserPage } from './pages/UserPage';
import { ProfessionalPage } from './pages/ProfessionalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<ProteCtedRoutes/>}>
          <Route path="/users" element={<UserPage/>}/>
          <Route path="/professionals" element={<ProfessionalPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
