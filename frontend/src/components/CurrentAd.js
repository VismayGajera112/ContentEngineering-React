import React, { useState } from 'react'

const CurrentAd = (props) => {

    const [toggle, setToggle] = useState(false)

    return (
        <div className='row' style={{ backgroundColor: "#DBDBDB" }}>
            <h3 className="title my-4">Current Advertisement</h3>
            {
                props.campaigns.map((campaign) =>
                    <>
                        {(campaign.status === 'Approved') ?
                            <div className="col-4 my-3 ms-2" >
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4 className="card-title">{campaign.campaignName}</h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className="col-5 mx-auto my-2">
                                            <img className="img-fluid" src={campaign.imageURL} alt="Ad template" />
                                        </div>
                                        <div className='d-flex flex-column justify-content-center gap-3'>
                                            <span>Start Date : {campaign.startDate}</span>
                                            <span>End Date : {campaign.endDate}</span>
                                            <span>Locations:&nbsp;&nbsp;
                                                {
                                                    campaign.locations.map((location) => <span>{location}, </span>)
                                                }
                                            </span>
                                            <span>Medium : {campaign.medium}</span>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            : <>{toggle ? <p>No published ads yet.</p> : setToggle(true)}</>
                        }
                    </>
                )
            }
        </div>
    )
}

export default CurrentAd
