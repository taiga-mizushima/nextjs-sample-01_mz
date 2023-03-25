import React, { FC, memo } from 'react'
import { PencilAltIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'
import { useAppDispatch } from '../app/hooks'
import { setEditedTask } from '../slices/appSlice'
import { useMutateTask } from '../hooks/useMutateTask'

const TaskItemMemo: FC<Task & {
    setId: React.Dispatch<React.SetStateAction<string>>
  }
  > = ({ id, title, description, setId }) => {
  const dispatch = useAppDispatch();
  const { deleteTaskMutation } = useMutateTask();
  return(
    <li>
      <span className="font-bold cursor-pointer" onClick={() => setId(id)}>
        {title}</span>
      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
export const TaskItem = memo(TaskItemMemo)