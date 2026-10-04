import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetail from './pages/CampaignDetail';
import AdSetDetail from './pages/AdSetDetail';
import AdDetail from './pages/AdDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
          <Route path="/adsets/:adsetId" element={<AdSetDetail />} />
          <Route path="/ads/:adId" element={<AdDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
