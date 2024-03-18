import React, { version } from 'react';
import { Link } from 'react-router-dom';


const NavBar = (prop) => {

    let version = '';

    if (prop.version !== undefined) {
        version = prop.version;
    }

    return (

        <div>

            <div style={{ textAlign: 'center' }}>
                <h1>
                    Welcome to Bible Study Administration
                </h1>
            </div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <span className='navbar-brand ms-3' href='#'>
                    Bible Study Admin📙
                </span>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNavaltMarkup'
                    aria-controls='navbarNavaltMarkup'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav'>
                        <span className='nav-item nav-link' href='#'>
                            <Link to='/'>Students</Link>
                        </span>
                        <span className='nav-item nav-link' href='#'>
                            <Link to='/new'>Create Student</Link>
                        </span>
                        <span className='nav-item nav-link' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => alert("Bible Study Admin 2024™\nWritten In: React\nVersion:" + version)}>
                            About
                        </span>
                    </div>
                </div>
            </nav>
        </div>

    );

};

export default NavBar;