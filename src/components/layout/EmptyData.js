import React from 'react'
import Kosong from '../../assets/kosong.png'

export default function EmptyData() {
  return (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        <img height="300" src={Kosong} />
        <h3 className="text-secondary">Data Belum Dipilih</h3>
    </div>
  )
}
