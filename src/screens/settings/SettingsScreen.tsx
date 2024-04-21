import { SettingsItemProps } from '@/types/SettingsItemProps';
import React from 'react';
import SettingsItem from './SettingsItem';
import { AiFillSetting } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setExecutableFilePath } from '@/libs/redux/slices/mainSlice';

interface SettingsItemsFullProps extends SettingsItemProps {
  content: JSX.Element
}

function SettingsScreen() {
  const dispatch = useAppDispatch()
  const { executableFilePath } = useAppSelector((state) => state.main)

  const onExecutableFileChanged = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      if (!file) return
      dispatch(setExecutableFilePath(file.path))
    },
    []
  )

  const items = React.useMemo<SettingsItemsFullProps[]>(
    () => [
      {
        title: 'Расположение файла с алгоритмами',
        description: 'Абсолютный адрес директории, в которой находится исполнительный файл с алгоритмами для решения задачи',
        content: (
          <div className='flex flex-row gap-2'>
            <input type='text' placeholder={executableFilePath} className='pl-2 font-bold' disabled/>
            <label htmlFor='exec-file-path' className='bg-green-500 rounded-md h-10 aspect-square flex justify-center items-center text-white'>
              <input type="file" name='exec-file-path' id='exec-file-path' onChange={onExecutableFileChanged}/>
              <AiFillSetting size={20}/>
            </label>
          </div>
        )
      }
    ],
    [executableFilePath]
  )

  return (
    <div className='flex flex-col gap-4'>
      {
        items.map((item, index) => (
          <SettingsItem key={index} title={item.title} description={item.description}>
            {item.content}
          </SettingsItem>
        ))
      }
    </div>
  );
}

export default SettingsScreen;