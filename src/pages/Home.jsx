import { Badge, Card, InputGroup, Table } from "react-bootstrap";
import Sidebar from "../components/layout/Sidebar";
import "../styles/home.scss";
import { IoIosMore } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import { GoPlus } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import StatusFilter from "../components/common/StatusFilter";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { employeeService } from "../services/employeeService";

const Home = () => {
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const filter = {
    status: status,
    search: search
    }

  const fetchKaryawan = async (filter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees(filter);
      setKaryawanList(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);


  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const handleFilterChange = (newFilter) => {
    setStatus(newFilter.toLowerCase())

    const query = {
        ...filter,
        status: newFilter.toLowerCase()
    }

    fetchKaryawan(query);
  };

  const handleSearch = () => {
    fetchKaryawan(filter);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <Card className="data-karyawan">
          <div className="card-header-karyawan">
            <h5 className="card-title">DATA KARYAWAN & TENAGA KESEHATAN</h5>
            <Dropdown align={"end"}>
              <Dropdown.Toggle id="dropdown-custom-components" className="more">
                <IoIosMore />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <GoPlus />
                  Tambah Karyawan
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">
                  <IoDocumentsOutline />
                  Salin Data Karyawan
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="card-body-karyawan">
            <Form.Select>
              <option>Semua Karyawan</option>
            </Form.Select>

            <p className="title-child">Status</p>
            <StatusFilter
              defaultStatus="AKTIF"
              onFilterChange={handleFilterChange}
            />

            <InputGroup className="pencarian">
              <Form.Control
                placeholder="Pencarian"
                aria-label="Amount (to the nearest dollar)"
                onChange={eventKey =>
                    setSearch(eventKey.nativeEvent.target.value)
                }
              />
              <InputGroup.Text onClick={handleSearch} style={{cursor: "pointer"}}>
                <IoSearchOutline />
              </InputGroup.Text>
            </InputGroup>

            <Table bordered className="tabel" responsive hover>
              <thead className="bg-dark">
                <tr>
                  <th className="text-center">#</th>
                  <th colSpan={2}>Karyawan / Tenaga Kesehatan</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>Loading data karyawan...</td>
                </tr>
                ) : karyawanList.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Tidak ada data karyawan.</td>
                  </tr>
                ) : (
                  <>
                    {karyawanList.map((karyawan, index) => (
                      <tr key={karyawan.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                          <p className="titte-desc-1">
                            {karyawan.nama_lengkap}
                          </p>
                          <p className="titte-desc-2">{karyawan.email}</p>
                          <Badge
                            bg={karyawan.status === 'aktif' ? "success" : "danger"}
                          >
                            {karyawan.status === 'aktif' ? "Aktif" : "Non Aktif"}
                          </Badge>
                        </td>
                        <td width={70}>
                          <div className="button-container">
                            <button class="simpan-button">
                              <FaArrowRight />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
