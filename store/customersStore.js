import create from 'zustand';
import axios from 'axios';

const apiUrl = 'https://613e84d4e9d92a0017e171f8.mockapi.io/customers'

const useCustomersStore = create(set => ({
  loading: false,
  setLoading: (value) => set(state => ({ loading: value })),
  success: false,
  setSuccess: (value) => set(state => ({ success: value })),
  customers: {},
  getCustomers: async (page) => {
    set({loading: true});
    set({success: false});
    await axios(`${apiUrl}`, 
    { params: { 
      'page': page || 1,
      'limit': 5,
      'sortBy': 'updatedAt',
      'order': 'desc'
    } }).then((response) => {
      set({ customers: response.data });
      set({loading: false});
      set({success: true});
    })
    .catch((error) => {
      console.log(error);
      set({loading: false});
      set({success: false});
    });
  },
  getCustomerById: async (id) => {
    set({loading: true});
    return await axios(`${apiUrl}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  createCustomer: async (data) => {

     // set date created and updated
    data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
    
    set({loading: true});

    // create a new customer
    axios.post(`${apiUrl}`, data)
      .then((response) => {
        window.location.href = '/customers';
        set({loading: false});
      })
      .catch((error) => {
        alert(error);
        set({loading: false});
      });
  },
  updateCustomer: async (id, data ) => {

    // set date created and updated
    data.updatedAt = new Date().toISOString();

    set({loading: true});
    // create a new customer
    axios.put(`${apiUrl}/${id}`, data)
      .then((response) => {
        window.location.href = '/customers';
        set({loading: false});
      })
      .catch((error) => {
        alert(error);
        set({loading: false});
      });
  },
  deleteCustomer: async (id) => {
    if(window.confirm("Are you sure?")) {
      set({loading: true});
      axios.delete(`${apiUrl}/${id}`)
      .then((response) => {
        set({loading: false});
        window.location.href = '/customers';
      })
      .catch( function(error) {
        alert(error);
        set({loading: false});
      });
    }
  },
}))


export default useCustomersStore;