import {AppDispatch, RootState} from '../store';
import {addTask, deleteTask, setTasks} from '../reducers/taskReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../../types/task';

export const fetchTasks =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const tasksJSON = await AsyncStorage.getItem('tasks');
      if (tasksJSON) {
        const tasks: Task[] = JSON.parse(tasksJSON);
        dispatch(setTasks(tasks));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

export const createTask =
  (task: Task) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentState = getState();
      const updatedTasks = [...currentState.tasks.tasks, task];
      dispatch(addTask(task));
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

export const deleteTasks =
  (taskId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentState = getState();
      const updatedTasks = currentState.tasks.tasks.filter(
        task => task.id !== taskId,
      );
      dispatch(deleteTask(taskId));
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

export const updateTasks =
  (
    taskIds: number[],
    updatedStatus: 'Todo' | 'Completed',
    updatedIsChecked: boolean,
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentState = getState();
      const updatedTasks: Task[] = currentState.tasks.tasks.map(task => {
        if (taskIds.includes(task.id)) {
          return {
            ...task,
            status: updatedStatus,
            isChecked: updatedIsChecked,
          };
        } else {
          return task;
        }
      });

      dispatch(setTasks(updatedTasks));
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };
