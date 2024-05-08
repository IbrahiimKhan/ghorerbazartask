export type Task = {
  title: string;
  status: 'Todo' | 'Completed';
  isChecked: boolean;
  id: number;
};
