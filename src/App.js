import React from 'react';
import './App.scss';
import { Button, Container, Alert } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container className="mt-5">
        <Alert variant="success">
          Setup Frontend Medeva Berhasil!
        </Alert>
        <h1>Selamat Datang di Aplikasi Karyawan Medeva</h1>
        <p className="custom-paragraph">
          Ini adalah contoh penggunaan Bootstrap dan SCSS.
        </p>
        <Button variant="primary">Tombol Bootstrap</Button>
      </Container>
    </div>
  );
}

export default App;