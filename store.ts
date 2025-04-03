import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  points: number;
  rank: string;
}

const initialState: UserState = { points: 0, rank: "Beginner" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increasePoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    decreasePoints: (state, action: PayloadAction<number>) => {
      state.points -= action.payload;
    },
  },
});

export const { increasePoints, decreasePoints } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
