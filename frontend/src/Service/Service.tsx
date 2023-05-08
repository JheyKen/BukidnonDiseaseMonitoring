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
  //patients
  getAllPatients: async () => {
    try {
      const data: AxiosResponse = await axios.get('/patient/')
      return data.data;
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
  }
}

export default Service;