import React from 'react'
import Cdc from './Admin/CDC/CdcPage'
import Dref from './Admin/DREF/DrefPage'
import PageOverview from './Admin/CDC/PageOverview';
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Overview from './Admin/CDC/Overview';
import FormationForm from './Admin/CDC/FormationForm';
import ChatTotal from './Admin/Chat/ChatTotal';
import TableFormations from './Admin/DREF/TableFormations';

function App() {
  return (
  <BrowserRouter>
  <>
  <Routes>
      <Route path="/CDC" element={<Cdc />}>
        <Route path="overview" element={<Overview />} />
        <Route path="ajouter-formation" element={<FormationForm />} />
        <Route path="chat" element={<ChatTotal role="CDC" />} />
      </Route>
      <Route path="/DREF" element={<Dref />}>
        <Route path="formations" element={<TableFormations />} />
        <Route path="chat" element={<ChatTotal role="DREF"  />} />
      </Route>
  </Routes>
      {/* <Cdc /> */}
      {/* <Dref /> */}
      {/* <PageOverview />   */}
      </>
    </BrowserRouter>
    
  );
}


export default App