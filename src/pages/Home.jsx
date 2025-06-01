import { Badge, Card, Col, InputGroup, Row, Table } from "react-bootstrap";
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
import KaryawanFullForm from "./KaryawanFullForm";
import EmptyData from "../components/layout/EmptyData";
import { toast } from 'react-toastify';

const Home = () => {
  const [karyawanList, setKaryawanList] = useState([]);
  const [karyawan, setKaryawan] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingID, setLoadingID] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [display, setDisplay] = useState(false);

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

  const fetchKaryawanByID = async (id) => {
    try {
      setLoadingID(true);
      const data = await employeeService.getEmployeeById(id);
      setKaryawan(data);
    } catch (err) {
      toast.error(`Opps ${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } finally {
      setLoadingID(false);
    }
  };

  const createKaryawan = async (params) => {
    try {
      setLoadingSave(true);
      setError(null);
      const data = await employeeService.createEmployee(params);
      if (data) {
        toast.success("Berhasil menambah data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
        fetchKaryawan(filter)
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Opps ${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } finally {
      setLoadingSave(false);
    }
  };
  
  const editKaryawan = async (id, params) => {
    try {
      setLoadingSave(true);
      setError(null);
      const data = await employeeService.updateEmployee(id, params);
      if (data) {
        toast.success("Berhasil mengedit data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
        fetchKaryawan(filter)
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Opps ${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    } finally {
      setLoadingSave(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

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

  const handleFormSubmit = (isUpdate, formData) => {

    if (isUpdate) {
      editKaryawan(karyawan.id, formData);
    } else {
      createKaryawan(formData);
    }

  };

  const handleDisplayID = (id) => {
    fetchKaryawanByID(id)
    setDisplay(true);
  }

  const handleAddKaryawan = () => {
    setDisplay(true);
    setKaryawan({});
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <Row>
          <Col sm={4}>
            <Card className="data-karyawan">
              <div className="card-header-karyawan">
                <h5 className="card-title">DATA KARYAWAN & TENAGA KESEHATAN</h5>
                <Dropdown align={"end"}>
                  <Dropdown.Toggle
                    id="dropdown-custom-components"
                    className="more"
                  >
                    <IoIosMore />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">
                      <GoPlus/>
                      <span style={{marginLeft: '10px'}} onClick={handleAddKaryawan}>Tambah Karyawan</span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">
                      <IoDocumentsOutline />
                      <span style={{marginLeft: '10px'}}>Salin Data Karyawan</span>
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
                  defaultStatus="SEMUA"
                  onFilterChange={handleFilterChange}
                />

                <InputGroup className="pencarian">
                  <Form.Control
                    placeholder="Pencarian"
                    aria-label="Amount (to the nearest dollar)"
                    onChange={(eventKey) =>
                      setSearch(eventKey.nativeEvent.target.value)
                    }
                  />
                  <InputGroup.Text
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  >
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
                              <p className="titte-desc-2">{karyawan.tipe_karyawan}</p>
                              <Badge
                                bg={
                                  karyawan.status === "aktif"
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {karyawan.status === "aktif"
                                  ? "Aktif"
                                  : "Non Aktif"}
                              </Badge>
                            </td>
                            <td width={70}>
                              <div className="button-container">
                                <button
                                  class="simpan-button"
                                  onClick={e => handleDisplayID(karyawan.id)}
                                >
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
          </Col>
          <Col sm={8}>
            {!display ? (
              <EmptyData />
            ) : (
              <Card className="data-karyawan">
                <div className="card-header-karyawan">
                  <h5 className="card-title">FORM TAMBAH KARYAWAN</h5>
                </div>
                <div className="card-body-karyawan">
                  <KaryawanFullForm onSubmitForm={handleFormSubmit} initialData={karyawan} isLoading={loadingSave} isUpdate={karyawan.id !== undefined ? true : false} />
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
