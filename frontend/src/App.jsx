import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cdc from './Admin/CDC/CdcPage';
import Dref from './Admin/DREF/DrefPage';
import Animateur from './Admin/ANIMATEUR/animateurPage';
import Overview from './Admin/CDC/Overview';
import FormationForm from './Admin/CDC/FormationForm';
import ChatTotal from './Admin/Chat/ChatTotal';
import TableFormations from './Admin/DREF/TableFormations';
import LoginPage from './Login/LoginPage';
import Welcome from './Admin/Welcome';
import AffichageFormation from './Admin/AffichageFormation';
import UpdatFormation from './Admin/CDC/UpdatFormation';
import FormateursTable from './Admin/FormateursTable';
import ProtectedRoute from './Login/ProtectedRoute'; // Import du composant de protection
import Hebergement from './Admin/DREF/Hebergement';
import FormationAnimateur from './Admin/ANIMATEUR/FormationAnimateur'
import HomePage from './Participants/HomePage';
import ContactPage from './Participants/ContactPage';
import CourseDetailsPage from './Participants/Course';
import CoursesPage from './Participants/CoursesPage';
import About from './Participants/AboutPage';
import AbsenceFormateursPage from './Admin/ANIMATEUR/AbsenceFormateursPage';
import Dashbord from './Admin/dashbord';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute allowedRoles={["PARTICIPANT"]} />}>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/about" element={<About />} />
      </Route>
     <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/ADMIN" element={<Dashbord />}>
          <Route index element={<Welcome role={"ADMIN"} />} /> {/* ✅ ici */}
        </Route>
      </Route>

        {/* Routes protégées pour CDC */}
        <Route element={<ProtectedRoute allowedRoles={["CDC"]} />}>
          <Route path="/CDC" element={<Cdc />}>
            <Route path="" element={<Welcome role="CDC" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="ajouter-formation" element={<FormationForm />} />
            <Route path="chat" element={<ChatTotal role="CDC" />} />
            <Route path="formation/:id" element={<AffichageFormation />} />
            <Route path="Updatformation/:id" element={<UpdatFormation  source="CDC" />} />
            <Route path="ajouter-formateurs/:id" element={<FormateursTable />} />
          </Route>
        </Route>

        {/* Routes protégées pour DREF */}
        <Route element={<ProtectedRoute allowedRoles={["DREF"]} />}>
          <Route path="/DREF" element={<Dref />}>
            <Route path="" element={<Welcome role="DREF" />} />
            <Route path="formations" element={<TableFormations />} />
            <Route path="chat" element={<ChatTotal role="DREF" />} />
            <Route path="Updatformation/:id" element={<UpdatFormation source="DREF" />} />
            <Route path="formation/:id" element={<AffichageFormation />} />
            <Route path="ajouter-formateurs/:id" element={<FormateursTable />} />
            <Route path="ajouter-hebergement/:id" element={<Hebergement />} />
          </Route>
        </Route>
        {/* Routes protégées pour ANIMATEUR */}
        <Route element={<ProtectedRoute allowedRoles={["ANIMATEUR"]} />}>
          <Route path="/ANIMATEUR" element={<Animateur />}>
            <Route path="" element={<Welcome role="ANIMATEUR" />} />
            <Route path="formationsAnimateur" element={<FormationAnimateur />} />
            <Route path="chat" element={<ChatTotal role="ANIMATEUR" />} />
            <Route path="formation/:id" element={<AffichageFormation />} />
            <Route path="formation/:id/absence" element={<AbsenceFormateursPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
   
    // <DocumentUpload />
    
  );
}

export default App;
