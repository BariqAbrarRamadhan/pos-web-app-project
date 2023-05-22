import React from 'react';
import DefaultLayout from "./../components/DefaultLayout"

const Homepage = () => {
  return (
    <DefaultLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <h1 style={{ fontSize: '30px' }}>Selamat Datang di<br />TOKO MAJU JAYA MAKMUR AGUNG ABADI</h1>
      </div>
    </DefaultLayout>
  )
}

export default Homepage