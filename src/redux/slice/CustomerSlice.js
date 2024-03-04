import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  customers: [],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerLoading: (state) => {
      state.loading = true;
    },
    customerFetched: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    },
    createCustomer: (state, action) => {
      state.loading = false;
      state.customers.push(action.payload);
      console.log("customer created data", action.payload);

    },
    updatedCustomer: (state, action) => {
      state.loading = false;
      const { id, updatedData } = action.payload;
      const index = state.customers.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...updatedData };
      }
    },
    deleteCustomer: (state, action) => {
      state.loading = false;
      const idToDelete = action.payload;
      state.customers = state.customers.filter((customer) => customer.id !== idToDelete);
    },
  },
});

export const {
  customerLoading,
  customerFetched,
  addCustomer,
  updatedCustomer,
  deleteCustomer,
} = customerSlice.actions;


export default customerSlice.reducer;
