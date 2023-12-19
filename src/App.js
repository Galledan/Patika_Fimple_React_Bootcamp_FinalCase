import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ApplicationSuccess from './pages/ApplicationSuccess';
import ApplicationStatus from './pages/ApplicationStatus';
import ApplicationDetailPage from './pages/ApplicationDetail';
import AdminPanel from './pages/AdminPanel';
import AdminApplicationDetailPage from './pages/AdminApplicationDetail';
function App() {
  return (
    <Router>
    <Switch>
      <Route path="/basvuru-olustur" exact component={Home} />
      <Route path="/basvuru-basarili" component={ApplicationSuccess} />
      <Route path="/basvuru-sorgula" component={ApplicationStatus} />
      <Route path="/basvuru/:basvuruNo" component={ApplicationDetailPage} />
      <Route path="/admin" exact component={AdminPanel} />
      <Route path="/admin/basvuru-listesi" exact component={AdminPanel} />
      <Route path="/admin/basvuru/:basvuruNo" component={AdminApplicationDetailPage} />
    </Switch>
  </Router>
  );
};

export default App;