import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserFormData } from "../../Component/Validation/userScheme";
const BaseUrl = `http://localhost:5000/api/create`;
export const createUser = createAsyncThunk(
  "/api/create",
  async (userData: UserFormData, thunkApi) => {
    try {
      const res = await fetch(BaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return await res.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

type UserForm = {
  loading: boolean;
  error: string | null;
};

const initialState: UserForm = {
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default UserSlice.reducer;
