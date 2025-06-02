import apiClient from "./api";

const createQueryStringFromObject = (paramsObj) => {
  if (!paramsObj || typeof paramsObj !== "object") {
    return "";
  }

  const queryParams = [];

  for (const key in paramsObj) {
    if (
      Object.prototype.hasOwnProperty.call(paramsObj, key) &&
      paramsObj[key] !== null &&
      paramsObj[key] !== undefined &&
      String(paramsObj[key]).trim() !== ""
    ) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`
      );
    }
  }

  return queryParams.join("&");
};

const getAllEmployees = async (param) => {
  const queryParams = createQueryStringFromObject(param);
  try {
    const response = await apiClient.get(`/employee/get-all?${queryParams}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(
      "Error fetching all employees:",
      error.response || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Gagal mengambil data karyawan"
    );
  }
};

/**
 * Mengambil data karyawan berdasarkan ID.
 * @param {string|number} employeeId ID karyawan.
 * @returns {Promise<Object>} Promise yang resolve dengan objek data karyawan.
 * @throws {Error} Melempar error jika terjadi masalah.
 */
const getEmployeeById = async (employeeId) => {
  try {
    const response = await apiClient.get(`/employee/${employeeId}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(
      `Error fetching employee with ID ${employeeId}:`,
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Gagal mengambil data karyawan ID ${employeeId}`
    );
  }
};

/**
 * Membuat data karyawan baru.
 * @param {Object} employeeData Data karyawan yang akan dibuat.
 * @returns {Promise<Object>} Promise yang resolve dengan objek data karyawan yang baru dibuat.
 * @throws {Error} Melempar error jika terjadi masalah.
 */
const createEmployee = async (employeeData) => {
  try {
    const response = await apiClient.post("/employee", employeeData);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error creating employee:", error.response || error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Gagal membuat karyawan baru"
    );
  }
};

/**
 * Mengupdate data karyawan berdasarkan ID.
 * @param {string|number} employeeId ID karyawan yang akan diupdate.
 * @param {Object} employeeData Data karyawan yang akan diupdate.
 * @returns {Promise<Object>} Promise yang resolve dengan objek data karyawan yang sudah diupdate.
 * @throws {Error} Melempar error jika terjadi masalah.
 */
const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await apiClient.put(
      `/employee/${employeeId}`,
      employeeData
    );
    return response.data.data || response.data;
  } catch (error) {
    console.error(
      `Error updating employee with ID ${employeeId}:`,
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Gagal mengupdate karyawan ID ${employeeId}`
    );
  }
};

/**
 * Menghapus data karyawan berdasarkan ID.
 * @param {string|number} employeeId ID karyawan yang akan dihapus.
 * @returns {Promise<Object>} Promise yang resolve dengan respons dari server (mis. pesan sukses).
 * @throws {Error} Melempar error jika terjadi masalah.
 */
const deleteEmployee = async (employeeId) => {
  try {
    const response = await apiClient.delete(`/employees/${employeeId}`);
    return response.data; // Biasanya berisi pesan sukses atau tidak ada konten
  } catch (error) {
    console.error(
      `Error deleting employee with ID ${employeeId}:`,
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Gagal menghapus karyawan ID ${employeeId}`
    );
  }
};

export const employeeService = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
