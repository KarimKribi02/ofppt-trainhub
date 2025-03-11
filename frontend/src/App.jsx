import React from 'react'
import Cdc from './Admin/CDC/CdcPage'
import Dref from './Admin/DREF/DrefPage'
import PageOverview from './Admin/CDC/PageOverview';
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Overview from './Admin/CDC/Overview';
import FormationForm from './Admin/CDC/FormationForm';
import ChatTotal from './Admin/Chat/ChatTotal';
import TableFormations from './Admin/DREF/TableFormations';
import LoginPage from './Login/LoginPage';
import Welcome from './Admin/Welcome';
import AffichageFormation from './Admin/AffichageFormation';
import UpdatFormation from './Admin/CDC/UpdatFormation';
import FormateursTable from './Admin/FormateursTable';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/CDC" element={<Cdc />}>
            <Route path="" element={<Welcome role="CDC" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="ajouter-formation" element={<FormationForm />} />
            <Route path="chat" element={<ChatTotal role="CDC" />} />
            <Route path="formation/:id" element={<AffichageFormation />} /> {/* ✅ Route dynamique */}
            <Route path="Updatformation/:id" element={<UpdatFormation/>} />
            <Route path="ajouter-formateurs/:id" element={<FormateursTable />} />
        </Route>pdatFormation
        <Route path="/DREF" element={<Dref />}>
            <Route path="" element={<Welcome role="DREF" />} />
            <Route path="formations" element={<TableFormations />} />
            <Route path="chat" element={<ChatTotal role="DREF" />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
    </Routes>
</BrowserRouter>
    
  );
}


export default App