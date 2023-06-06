import axios, { AxiosResponse } from 'axios';

const Service = {
  //common
  getLogin: async (username: string, password: string) => {
    try {
      const data: AxiosResponse = await axios.post('/common/login/', {
        username,
        password
      })
      return data;
    } catch (error) {
      throw error;
    }
  },
  getBarangayPerMunicipality: async (municipality: string) => {
    try {
      const data: AxiosResponse = await axios.get(`/common/barangay/${municipality}`);
      return data.data
    } catch (error) {
      throw error
    }
  },
  generatePDF: async () => {
    try {
      const data: AxiosResponse = await axios.post('/common/generatePDF');
      return data.data
    } catch (error) {
      throw error
    }
  },
  //accounts
  getAllVerifiedAccounts: async () => {
    try {
      const data: AxiosResponse = await axios.get('/account/verified')
      return data.data;
    } catch (error) {
      throw error
    }
  },
  getAllPendingAccounts: async () => {
    try {
      const data: AxiosResponse = await axios.get('/account/pending')
      return data.data
    } catch (error) {
      throw error
    }
  },
  getAccountByUsername: async (username: string) => {
    try {
      const data: AxiosResponse = await axios.get(`/account/${username}`)
      return data.data;
    } catch (error) {
      throw error
    }
  },
  createAccount: async (createData: object) => {
    try {
      const data: AxiosResponse = await axios.post('/account/createAccount', {
        createData
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  editAccount: async (username: string, editParam: object) => {
    try {
      const data: AxiosResponse = await axios.put('/account/editAccount', {
        username,
        editParam
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  deleteAccount: async (username: string) => {
    try {
      const data: AxiosResponse = await axios.delete(`/account/deleteAccount/${username}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  //patients
  getAllPatients: async () => {
    try {
      const data: AxiosResponse = await axios.get('/patient/')
      return data.data;
    } catch (error) {
      throw error
    }
  },
  getPatientById: async (id: string) => {
    try {
      const data: AxiosResponse = await axios.get(`/patient/getById/${id}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  addPatient: async (patientData: object) => {
    try {
      const data: AxiosResponse = await axios.post('/patient/addPatient', {
        patientData
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  editPatient: async (patientData: object) => {
    try {
      const data: AxiosResponse = await axios.put('/patient/editPatient', {
        patientData
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  deletePatient: async (id: string) => {
    try {
      const data: AxiosResponse = await axios.delete(`/patient/deletePatient/${id}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  //victims
  getVictimsCountPerMunicipality: async (diagnosis: string, municipality: string, date_from: any, date_to: any) => {
    try {
      const data: AxiosResponse = await axios.get(`/victim/victimsCountPerMunicipality/${diagnosis}/${municipality}/${date_from}/${date_to}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  getDeathCountPerMunicipality: async (diagnosis: string, municipality: string, date_from: any, date_to: any) => {
    try {
      const data: AxiosResponse = await axios.get(`/victim/deathCounts/${diagnosis}/${municipality}/${date_from}/${date_to}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  getVictimsCountPerGender: async (diagnosis: string, date_from: any, date_to: any) => {
    try {
      const data: AxiosResponse = await axios.get(`/victim/gender/${diagnosis}/${date_from}/${date_to}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  getVictimsCountPerAge: async (diagnosis: string, date_from: any, date_to: any) => {
    try {
      const data: AxiosResponse = await axios.get(`/victim/age/${diagnosis}/${date_from}/${date_to}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  getVictimsPerDiagnosisPerMonth: async (diagnosis: string, year: number, month: number) => {
    try {
      const data: AxiosResponse = await axios.get(`/victim/victimsPerDiagnosisPerMonth/${diagnosis}/${year}/${month}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  //organizations
  getAllOrganizations: async () => {
    try {
      const data: AxiosResponse = await axios.get('/organization/')
      return data.data
    } catch (error) {
      throw error
    }
  },
  getOrganizationById: async (id: string) => {
    try {
      const data: AxiosResponse = await axios.get(`/organization/getById/${id}`)
      return data.data
    } catch (error) {
      throw error
    }
  },
  addOrganization: async (orgData: object) => {
    try {
      const data: AxiosResponse = await axios.post('/organization/add', {
        orgData
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  editOrganization: async (id: string, orgData: object) => {
    try {
      const data: AxiosResponse = await axios.put('/organization/edit', {
        id,
        orgData
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
  deleteOrganization: async (id: string) => {
    try {
      const data: AxiosResponse = await axios.delete(`/organization/delete/${id}`)
      return data.data
    } catch (error) {
      throw error
    }
  }
}

export default Service;