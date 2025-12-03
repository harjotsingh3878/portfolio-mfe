import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFeatureFlags = createAsyncThunk(
  'featureFlags/fetch',
  async () => {
    const response = await axios.get('http://localhost:4000/api/feature-flags');
    return response.data;
  }
);

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState: {
    flags: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureFlags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeatureFlags.fulfilled, (state, action) => {
        state.loading = false;
        state.flags = action.payload;
      });
  },
});

export default featureFlagsSlice.reducer;
