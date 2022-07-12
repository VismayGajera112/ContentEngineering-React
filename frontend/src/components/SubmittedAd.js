import React from 'react'

const SubmittedAd = (props) => {
    return (
        <div className="col mb-3">
            <div className="container-fluid d-flex flex-row border rounded shadow"
                style={{ width: "100%", padding: "8px", height: "100%" }}>
                <div className="col" style={{ marginRight: "4px", marginLeft: "4px", borderStyle: "none" }}>
                    <img className="img-fluid" alt='Current' src={props.details.imageURL} style={{ padding: "4px", width: "100%", height: "100%" }} />
                </div>
                <div className="col d-flex flex-column flex-wrap" style={{ marginRight: "4px", marginLeft: "4px", padding: " 4px", borderStyle: "none" }}>
                    <ul className="list-group text-start">
                        <li className="list-group-item flex-wrap" style={{ border: "none" }}>
                            <span className="flex-wrap">{props.details.campaignName}</span>
                        </li>
                        <li className="list-group-item flex-wrap" style={{ border: "none" }} >
                            <span>Start :&nbsp;</span>
                            <span className="flex-wrap">{props.details.startDate}</span>
                        </li>
                        <li className="list-group-item flex-wrap" style={{ border: "none" }}>
                            <span>Expire :&nbsp;</span>
                            <span className="flex-wrap">{props.details.endDate}</span>
                        </li>
                        <li className="list-group-item flex-wrap" style={{ border: "none" }}>
                            <span>Status :&nbsp;</span>
                            <span className={props.details.status === 'Approved' ? "text-light bg-success border-success" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative" }}>{props.details.status}</span>
                            <span className={props.details.status === 'Pending' ? "text-light bg-warning border-warning" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative" }}>{props.details.status}</span>
                            <span className={props.details.status === 'Rejected' ? "text-light bg-danger border-danger" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative" }}>{props.details.status}</span>
                        </li>
                        <li className="list-group-item" style={{ border: "none" }}>
                            {
                                props.details.status === 'Rejected' || props.details.status === 'Approved' ?
                                    <>
                                        <a href="/customer/adcampaigns" className='button'>More</a>
                                    </>
                                    : <>
                                        <a href="#!" className='button'>Edit</a>
                                    </>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SubmittedAd
