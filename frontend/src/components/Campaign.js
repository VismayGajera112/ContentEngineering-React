import axios from 'axios'
import React, { useState } from 'react'
import image from '../images/minimalist house (Poster).png'
import ShowReport from './ShowReport'

const Campaign = (props) => {

    const [report, setReport] = useState([])

    const locations = props.details.locations.map((location) => <span>{location}, </span>)

    const handleClick = async (event) => {

        let campaignName = event.target.parentElement.parentElement.querySelector('.card-title').textContent

        const res = await axios.get(`http://localhost:5000/api/customer/dashboard/campaignReport/${campaignName}`)
        setReport([res.data])
        console.log(report)
    }

    return (
        <div className="col-4 my-3">
            <div className={props.details.status === 'Approved' ? 'card shadow border-success' : 'card shadow'}>
                <div className='card-header'>
                    <h4 className="card-title">{props.details.campaignName}</h4>
                    <h6 className="text-start text-muted card-subtitle mb-2">Status
                        <span className={props.details.status === 'Approved' ? "text-light bg-success border-success" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative", float: "right" }}>{props.details.status}</span>
                        <span className={props.details.status === 'Pending' ? "text-light bg-warning border-warning" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative", float: "right" }}>{props.details.status}</span>
                        <span className={props.details.status === 'Rejected' ? "text-light bg-danger border-danger" : "d-none"} style={{ padding: "4px", borderRadius: "4px", position: "relative", float: "right" }}>{props.details.status}</span>
                    </h6>
                </div>
                <div className='card-body'>
                    <div className="col-5 mx-auto my-2">
                        <img className="img-fluid" src={image} alt="Ad template" />
                    </div>

                    <div className='d-flex flex-column justify-content-center gap-3'>
                        <span>Start Date : {props.details.startDate}</span>
                        <span>End Date : {props.details.endDate}</span>
                        <span>Locations : {locations}</span>
                        <span>Medium : {props.details.medium}</span>
                    </div>
                </div>
                <div className={props.details.status === 'Approved' ? 'd-none' : 'card-footer'}>
                    <a className={props.details.status === 'Rejected' ? "card-link btn btn-outline-primary" : 'd-none'} onClick={handleClick} data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas">Show Report</a>
                    <a className={props.details.status === 'Pending' ? "disabled card-link btn btn-outline-primary" : 'd-none'} href="true">Show Report</a>
                </div>
            </div>

            {/* Report */}

            {
                report.length === 1 ?
                    <>
                        <ShowReport repDetails={report[0]} />
                    </>
                    : ""
            }


        </div>
    )
}

export default Campaign
