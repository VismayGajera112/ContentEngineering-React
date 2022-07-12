/* This is importing the css file for the app, the Route and Routes components from the
react-router-dom library, and the components for each of the pages in the app. */
import './App.css';
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from './screens/CustomerDashboard/CustomerDashboard';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import AdDetails from './screens/AdDetails/AdDetails';
import AdCampaigns from './screens/AdCampaigns/AdCampaigns';
import Login from './screens/LoginScreen/Login';

/**
 * The App function returns a div with a Routes component that has a Route component for each of the
 * pages in the app
 * @returns The Routes component is being returned.
 */
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />}/>
        <Route path="/customer/profile" element={<ProfileScreen />} />
        <Route path="/customer/addetails" element={<AdDetails />} />
        <Route path="/customer/adcampaigns" element={<AdCampaigns />} />
      </Routes>
    </div >
  );
}

export default App;
