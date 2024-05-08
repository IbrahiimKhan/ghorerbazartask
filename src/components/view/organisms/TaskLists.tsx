import React, {FC, ReactElement} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Divider, TaskItem, Text} from '../../ui/../../components';
import {Task} from '../../../types/task';
import {useDispatch} from 'react-redux';
import {deleteTasks} from '../../../store/actions/taskActions';

type TskListProps = {
  data: Task[];
  handleToggleCompletion: (task: Task, index: string | number) => void;
};
const TaskLists: FC<TskListProps> = ({
  data,
  handleToggleCompletion,
}): ReactElement => {
  const dispatch = useDispatch();

  return (
    <FlashList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <TaskItem
            task={item}
            key={item.id}
            handleDeleteTask={function (): void {
              dispatch(deleteTasks(item.id));
            }}
            handleToggleCompletion={function (task: any): void {
              handleToggleCompletion(task, index);
            }}
          />
        );
      }}
      ItemSeparatorComponent={() => <Divider marginVertical={2} />}
      estimatedItemSize={50}
      ListEmptyComponent={
        <Text variant="b3regular" color="white">
          Nothing Here!
        </Text>
      }
      data={data}
    />
  );
};

export default TaskLists;
