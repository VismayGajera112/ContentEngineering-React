import React from 'react'

const ShowReport = (props) => {

    return (
        <div className="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h3 className="offcanvas-title" id="offcanvasLabel">{props.repDetails.campaignName}</h3>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div>
                    <img className="img-fluid" src={props.repDetails.imageURL} alt="" />
                </div>
                <div className="d-flex flex-column mt-3">
                    <h3>{props.repDetails.foundedOn} results found</h3>
                    <table className='table table-striped table-hover'>
                        <thead className="">
                            <tr>
                                <th scope='col'>Index</th>
                                <th scope='col'>Link</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {props.repDetails.links.map((link, index) =>
                                <tr>
                                    <th scope='row'>{index}</th>
                                    <td><a href={link}> {link} </a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowReport
