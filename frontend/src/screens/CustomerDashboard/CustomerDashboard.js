import { React, useState, useEffect } from 'react'
import './CustomerDashboard.css'
import '../../css/style.css'
import Sidebar from '../../components/Sidebar';
import SubmittedAd from '../../components/SubmittedAd';
import axios from 'axios'
import CurrentAd from '../../components/CurrentAd';
import CreateCampaign from '../../components/CreateCampaign';

/**
 * It gets the campaigns from the API and sets the campaigns to the response.data
 * @returns The component is returning a div with a Sidebar component and a div with an id of
 * currentAd.
 */
const CustomerDashboard = () => {

  /* Setting the initial state of the component. */
  const [campaigns, setCampaigns] = useState([])
  const [createCampaign, setCreateCampaign] = useState(false)

  /**
   * It gets the campaigns from the API and sets the campaigns to the response.data.
   */
  const getCampaigns = async () => {
    await axios
      .get('http://localhost:5000/api/customer/dashboard')
      .then(response => {
        setCampaigns(
          response.data.filter(campaign => campaign.createdby === localStorage.getItem('user'))
        )
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const allSideDivider = document.querySelectorAll('#sidebar .divider');

  const handleToggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hide');

    if (sidebar.classList.contains('hide')) {
      allSideDivider.forEach(item => {
        item.textContent = '-'
      })
      document.querySelector('#currentAd').style = `width: calc(100% - 60px);left: 60px;`
      document.querySelector('#advertisement-section').style = `width: calc(100% - 60px);left: 60px;`

    } else {
      allSideDivider.forEach(item => {
        item.textContent = item.dataset.text;
      })
      document.querySelector('#currentAd').style = `width: calc(100% - 260px);left: 260px;`
      document.querySelector('#advertisement-section').style = `width: calc(100% - 260px);left: 260px;`
    }
  }

  const handleCreateCampaign = () => {
    createCampaign ? setCreateCampaign(false) : setCreateCampaign(true)
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Sidebar header="Customer Dashboard" data={handleToggleSidebar} onClickCreateCampaign={handleCreateCampaign} />
      <div id='currentAd'>
        {
          createCampaign ? <CreateCampaign /> :
            <>
              <CurrentAd campaigns={campaigns} />
              <section className="d-flex flex-column p-4 my-4">
                <div>
                  <h1 className="my-4">Your Advertisement</h1>
                </div>
                {
                  campaigns.length > 0 ?
                    <div className="row row-cols-2 d-lg-flex flex-wrap my-4">
                      {
                        campaigns.map((campaign) =>
                          <>
                            <SubmittedAd details={campaign} />
                          </>
                        )
                      }
                    </div>
                    : "No campaigns created yet."
                }
                <div className="my-4">
                  <a href="/customer/addetails" className='button'>More</a>
                </div>
              </section>
            </>
        }
      </div>
    </div >
  )
}

export default CustomerDashboard
