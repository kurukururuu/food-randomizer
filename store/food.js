import { createSlice } from '@reduxjs/toolkit'

const INITIAL_LIST = {
  data: [],
  meta: {}
}

const INITIAL_FILTER = {
  type: []
}

const INITIAL_STATE = {
  item: {},
  list: INITIAL_LIST,
  types: INITIAL_LIST,
  filter: INITIAL_FILTER,
  loading: true
}

export const store = createSlice({
  name: 'food',
  initialState: INITIAL_STATE,
  reducers: {
    setItem:(state, action) => {
      state.item = action.payload
    },
    setList:(state, action) => {
      switch (action.payload.action) {
        case 'append':
          for (let i = 0; i < action.payload.data.length; i++) {
            const item = action.payload.data[i];
            state.list.data.push(item)
          }
          state.list.meta = action.payload.paging
          break
        case 'set':
        default:
          state.list = action.payload
          break
      }
    },
    setTypes:(state, action) => {
      state.types.data = action.payload
    },
    setFilter:(state, action) => {
      state.filter = action.payload
    },
    resetList:(state) => {
      state.list = INITIAL_LIST
    },
    setLoading:(state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItem, setList, setTypes, setFilter, resetList, setLoading } = store.actions

export default store.reducer