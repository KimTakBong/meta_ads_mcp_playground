import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetail from './pages/CampaignDetail';
import CampaignForm from './pages/CampaignForm';
import AdSetsPage from './pages/AdSetsPage';
import AdSetDetail from './pages/AdSetDetail';
import AdSetForm from './pages/AdSetForm';
import AdsPage from './pages/AdsPage';
import AdDetail from './pages/AdDetail';
import AdForm from './pages/AdForm';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/new" element={<CampaignForm />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
          <Route path="/adsets" element={<AdSetsPage />} />
          <Route path="/adsets/new" element={<AdSetForm />} />
          <Route path="/adsets/:adsetId" element={<AdSetDetail />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/ads/new" element={<AdForm />} />
          <Route path="/ads/:adId" element={<AdDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
