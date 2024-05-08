import {
  Card,
  Checkbox,
  HStack,
  Text,
  CheckboxStatus,
  Box,
} from '../../../components';
import React, {FC, ReactElement} from 'react';
import IconButton from '../../ui/media-icons/IconButton';
import {Task} from '../../../types/task';

type TaskItemProps = {
  task: Task;
  handleToggleCompletion: (task: any) => void;
  handleDeleteTask: () => void;
};

export const capitalizeFirstLetter = (input: string): string => {
  if (!input) {
    return input;
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const TaskItem: FC<TaskItemProps> = ({
  task,
  handleDeleteTask,
  handleToggleCompletion,
}): ReactElement => {
  return (
    <Card paddingVertical={3} variant="elevated">
      <HStack justifyContent="space-between">
        <HStack paddingLeft={3}>
          <Checkbox
            status={
              task.isChecked ? CheckboxStatus.Checked : CheckboxStatus.Unchecked
            }
            onPress={() => handleToggleCompletion(task)}
          />
          <Text variant="heading3">{capitalizeFirstLetter(task.title)}</Text>

          <Box
            px={2}
            ml={3}
            borderRadius="rounded-full"
            backgroundColor={task.status === 'Todo' ? 'primary' : 'success'}>
            <Text color="white" variant="b5regular">
              {capitalizeFirstLetter(task.status)}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <IconButton
            icon="delete"
            onPress={handleDeleteTask}
            variant="vector"
            color="danger"
            size={8}
          />
        </HStack>
      </HStack>
    </Card>
  );
};

export default TaskItem;
