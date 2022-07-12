import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Campaign from '../../components/Campaign'
import Sidebar from '../../components/Sidebar'
import './AdCampaigns.css'

/**
 * I'm trying to display a spinner while the data is being fetched from the API.
 * @returns The return is a component that is being rendered.
 */
const AdCampaigns = () => {

    /* A state that is being set to an empty array. */
    const [campaigns, setCampaigns] = useState([])

    /**
     * It gets the campaigns from the database and sets the state of the campaigns to the
     * response.data.
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
            document.querySelector('#campaignRow').style = `width: calc(100% - 60px);left: 60px;`
        } else {
            allSideDivider.forEach(item => {
                item.textContent = item.dataset.text;
            })
            document.querySelector('#campaignRow').style = `width: calc(100% - 260px);left: 260px;`

        }
    }

    return (
        <>
            <Sidebar header="Ad Campaigns" data={handleToggleSidebar} onClickCreateCampaign='hide' />
            {
                campaigns.length > 0 ?
                    <div id="campaignRow" className="row">
                        {
                            campaigns.map((campaign) =>
                                <>
                                    <Campaign details={campaign} />
                                </>
                            )
                        }
                    </div>
                    :
                    // <div class="spinner-grow text-warning m-5" role="status">
                    <span class="visually-hidden">Loading...</span>
                // </div>
            }
        </>
    )
}
export default AdCampaigns
