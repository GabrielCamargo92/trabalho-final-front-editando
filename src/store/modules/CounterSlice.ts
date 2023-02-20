import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    aumentar(state) {
      state.value++;
    },
    diminuir(state) {
      state.value--;
    },
    somarValor(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    diminuirValor(state, action: PayloadAction<number>) {
      state.value -= action.payload;
    },
  },
});

export const { aumentar, diminuir, somarValor, diminuirValor } =
  counterSlice.actions;
export default counterSlice.reducer;
