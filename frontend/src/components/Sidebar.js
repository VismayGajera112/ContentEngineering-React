import React from 'react'
import Logo from '../images/customer-logo.png'
import { FaUserCircle, FaBell, FaHome, FaEye, FaSearch } from "react-icons/fa";
import { AiFillNotification, AiOutlineRight } from "react-icons/ai";
import { BsFillBadgeAdFill, BsListNested, BsPersonCircle, BsGear, BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Sidebar = (props) => {

    const allSideDivider = document.querySelectorAll('#sidebar .divider');

    const handleProfileClick = () => {
        document.querySelector('.profile-link').classList.toggle('show');
    }

    const handleMouseEnter = () => {
        if (this.classList.contains('hide')) {
            allSideDivider.forEach(item => {
                item.textContent = item.dataset.text;
            })
        }
    }

    const handleMouseLeave = () => {
        if (this.classList.contains('hide')) {
            allSideDivider.forEach(item => {
                item.textContent = '-'
            })
        }
    }

    const handleSideMenu = () => {
        const allDropdown = document.querySelector('#sidebar .side-dropdown');
        const a = allDropdown.parentElement.querySelector('a:first-child');
        a.classList.toggle('active');
        allDropdown.classList.toggle('show');
    }

    const navigate = useNavigate()
    
    const handleLogout = () => {

        axios.get('http://localhost:5000/api/customer/logout').then((response) => {
            console.log(response.data)
        });

        localStorage.removeItem('user')
        localStorage.clear()
        navigate('/customer/login')
    }

    const handleProfileView = () =>{
        navigate('/customer/profile')
    }

    return (
        <div>
            <section id="sidebar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="/customer/dashboard" className="brand" style={{ textDecoration: 'none'}}><img className="icon" src={Logo} alt="" />VAMS</a>
                <ul className="side-menu">
                    <li><a href="/customer/dashboard" className={props.header === 'Customer Dashboard' ? "active" : ""}><FaHome className='icon' /> Dashboard</a></li>
                    <li><a href="#!"><FaEye className='icon' />Viewers</a>
                    </li>
                    <li onClick={handleSideMenu} style={{ cursor: 'pointer' }}><a href="#!" className={props.header === 'Ad Campaigns' ? 'bg-warning' : ""}><BsFillBadgeAdFill className='icon' />Advertisement<AiOutlineRight className='icon-right' /></a>
                        <ul className="side-dropdown">
                            <li><a href="/customer/addetails">Ad Details</a></li>
                            <li><a href="#!">Ad Planner</a></li>
                            <li><a href="/customer/adcampaigns">Ad Campaigns</a></li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section id="content">
                <nav>
                    <BsListNested className='toggle-sidebar' onClick={props.data} />
                    <form action="#">
                        <div className="form-group">
                            <input type="text" placeholder="Search..." />
                            <FaSearch className='icon' />
                        </div>
                    </form>
                    {
                        props.onClickCreateCampaign !== 'hide' ?
                        <a className="btn btn-warning" href="#!" onClick={props.onClickCreateCampaign}><span>Create campaign</span></a>
                        : ""
                    }
                    <a href="#!" className="nav-linked">
                        <FaBell className='icon' />
                        <span className="badge">5</span>
                    </a>
                    <a href="#!" className="nav-linked">
                        <AiFillNotification className="icon" />
                        <span className="badge">8</span>
                    </a>
                    <span className="divider"></span>
                    <div className="profile">
                        <FaUserCircle style={{ fontSize: '32px' }} onClick={handleProfileClick} />
                        <ul className="profile-link">
                            <li><p onClick={handleProfileView} style={{ textDecoration: 'none' }}><BsPersonCircle className='icon' /> Profile</p></li>
                        <li><p><BsGear className='icon' /> Settings</p></li>
                        <li><p onClick={handleLogout}><BsBoxArrowRight className='icon' /> Logout</p></li>
                    </ul>
                </div>
            </nav>
            <main>
                <h1 className="title">{props.header}</h1>
                <ul className="breadcrumbs">
                    <li><a href="#!">Home</a></li>
                    <li className="divider">/</li>
                    <li><a href="#!" className="active1">{props.header}</a></li>
                </ul>
            </main>
        </section>
        </div >
    )
}

export default Sidebar
