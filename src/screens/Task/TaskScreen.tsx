import React, {ReactElement, useEffect, useState} from 'react';
import {
  Screen,
  Header,
  ContentSafeAreaView,
  Button,
  Input,
  Box,
  BottomSheet,
  HStack,
} from '../../components';
import useHeader from '../../hooks/useHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTasks,
  createTask,
  updateTasks,
} from '../../store/actions/taskActions';
import {RootState} from '../../store/store';
import {Task} from '../../types/task';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import TaskLists from '../../components/view/organisms/TaskLists';

const HomeHeader = (): ReactElement => {
  return (
    <Header>
      <Header.Content title="Welcome User" subTitle="Manage Your Task Here" />
    </Header>
  );
};

export const TaskScreen = (): ReactElement => {
  useHeader(HomeHeader);

  //state variables
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [oldData, setOldData] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [taskIds, setTaskIds] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  //handle task create
  const handleCreateTask = (input: string) => {
    const newTask: Task = {
      id: Math.random(),
      title: input,
      status: 'Todo',
      isChecked: false,
    };
    dispatch(createTask(newTask));
    setBottomSheetVisible(false);
    setTitle('');
  };

  //handle  task complete
  const handleToggleCompletion = (task: any, index: any) => {
    const temp = [...tasksData];
    temp[index] = {...temp[index], isChecked: !task.isChecked};
    setTasksData(temp);
    if (temp[index].isChecked && !taskIds.includes(temp[index].id)) {
      setTaskIds([...taskIds, temp[index].id]);
    } else {
      const newATasks = taskIds;
      newATasks.splice(newATasks.indexOf(temp[index].id), 1);
      setTaskIds(newATasks);
    }
  };

  // filter data based on search
  const searchFilterFunctions = (text: string) => {
    if (text !== '') {
      let tempData = tasksData.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setTasksData(tempData);
    } else {
      setTasksData(oldData);
    }
  };

  //side effects
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasksData(tasks);
    setOldData(tasks);
  }, [tasks]);

  return (
    <Screen
      contentContainerStyle={styles.Container}
      safeAreaEdges={['top', 'bottom']}>
      <ContentSafeAreaView flex={1}>
        <Button
          mt={5}
          onPress={() => setBottomSheetVisible(true)}
          variant="white"
          alignSelf="flex-end"
          padding={0}
          width={'33%'}>
          <Button.Text title="New" />
          <Button.Icon variant="vector" icon="add" color="primary" size={10} />
        </Button>
        <Input
          label="Search Task"
          labelColor="white"
          value={search}
          onChangeText={text => {
            searchFilterFunctions(text);
            setSearch(text);
          }}
        />
        {taskIds.length > 0 && (
          <Button
            onPress={() => {
              dispatch(updateTasks(taskIds, 'Completed', false));
              setTaskIds([]);
            }}
            variant="success"
            my={5}
            paddingRight={5}>
            <Button.Text
              title={`Complete ${taskIds.length} Task${
                taskIds.length > 1 ? 's' : ''
              }`}
            />
          </Button>
        )}
        <Box flex={1}>
          <TaskLists
            data={tasksData}
            handleToggleCompletion={function (
              task: Task,
              index: string | number,
            ): void {
              handleToggleCompletion(task, index);
            }}
          />
        </Box>
        <BottomSheet isVisible={bottomSheetVisible}>
          <ContentSafeAreaView>
            <Input value={title} onChangeText={text => setTitle(text)} />
            <HStack flex={1} gap={5} mt={10}>
              <Button
                flex={1}
                variant="white"
                disabled={!title}
                onPress={() => handleCreateTask(title)}>
                <Button.Text title="Add Task" />
              </Button>
              <Button
                flex={1}
                variant="white"
                type="outlined"
                onPress={() => setBottomSheetVisible(false)}>
                <Button.Text title="Cancel" />
              </Button>
            </HStack>
          </ContentSafeAreaView>
        </BottomSheet>
      </ContentSafeAreaView>
    </Screen>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: theme.borderRadii['rounded-lg'],
    borderTopRightRadius: theme.borderRadii['rounded-lg'],
  },
});
