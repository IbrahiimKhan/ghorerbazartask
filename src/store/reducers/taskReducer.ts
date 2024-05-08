import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../../types/task';

const initialState: {tasks: Task[]} = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {addTask, deleteTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;
