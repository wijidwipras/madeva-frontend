import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/navbar.scss';
import Logo from '../../assets/logo-medeva-text.png'
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { CiBellOn } from "react-icons/ci";
import LogoProfile from '../../assets/logo-ico-madeva.png'

function AppNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Navbar collapseOnSelect expand="lg" className="appNavbar bg-body-tertiary shadow-sm">
      <Container fluid className='container-navbar'>
        <Navbar.Brand className='brand' href="#home">Klinik Terikini</Navbar.Brand>
        <div className='logo'>
        <img
            src={Logo}
            height="30"
            alt="Medeva Logo"
            />
        </div>
        {/* Tombol Toggle untuk Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Konten Navbar yang akan collapse di mobile */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#notifications" className="me-2 mr-5">
              <CiBellOn size={24} />
            </Nav.Link>
            <div>
              <p className='text-profile text-end'>
                kliniktraining
                <br/>
                <span className='text-desc'>(manager, dokter, kasir)</span>
              </p>
            </div>

            {/* Dropdown User */}
            <NavDropdown
              title={
                <Image
                  src={LogoProfile}
                  roundedCircle
                  style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                  alt="User Avatar"
                />
              }
              id="basic-nav-dropdown"
              align="end"
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="p-2 text-center" style={{minWidth: '200px'}}>
                <div className="fw-bold">Klinik Training</div>
                <div className="text-muted small">Manajer Divisi Akut</div>
              </div>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;