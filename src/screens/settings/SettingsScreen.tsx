import { SettingsItemProps } from '@/types/SettingsItemProps';
import React from 'react';
import SettingsItem from './SettingsItem';
import { AiFillSetting } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { setExecutableFilePath, setLogFilePath, setResultsFilePath } from '@/libs/redux/slices/mainSlice';

interface SettingsItemsFullProps extends SettingsItemProps {
  content: JSX.Element
}

function SettingsScreen() {
  const dispatch = useAppDispatch()
  const { executableFilePath, logFilePath, resultsFilePath } = useAppSelector((state) => state.main)

  const onExecutableFileChanged = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      if (!file) return
      dispatch(setExecutableFilePath(file.path))
    },
    [executableFilePath, logFilePath]
  )
  const onLogFileChanged = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      if (!file) return
      dispatch(setLogFilePath(file.path))
    },
    [executableFilePath, logFilePath]
  )
  const onResultsFileChanged = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      if (!file) return
      dispatch(setResultsFilePath(file.path))
    },
    []
  )

  const items = React.useMemo<SettingsItemsFullProps[]>(
    () => [
      {
        title: 'Расположение JAR-файла с алгоритмами',
        description: 'Абсолютный адрес файла в вашей ФС, который содержит алгоритмы решения задачи',
        content: (
          <div className='flex flex-row gap-2'>
            <input type='text' placeholder={executableFilePath} className='font-bold' disabled/>
            <label htmlFor='exec-file-path' className='settings-panel-button'>
              <input type="file" name='exec-file-path' id='exec-file-path' onChange={onExecutableFileChanged}/>
              <AiFillSetting className='cursor-pointer' size={20}/>
            </label>
          </div>
        )
      },
      {
        title: 'Файл для сбора логов приложения',
        description: 'Абсолютный адрес файла, в который приложение, указанное в предыдущем пункте будет складывать логи',
        content: (
          <div className='flex flex-row gap-2'>
            <input type='text' placeholder={logFilePath} className='font-bold' disabled/>
            <label htmlFor='log-file-path' className='settings-panel-button'>
              <input type="file" name='log-file-path' id='log-file-path' onChange={onLogFileChanged}/>
              <AiFillSetting className='cursor-pointer' size={20}/>
            </label>
          </div>
        )
      },
      {
        title: 'Файл для записи результатов',
        description: 'Абсолютный путь к файлу, в которой программа будет записывать результаты выполнения',
        content: (
          <div className='flex flex-row gap-2'>
            <input type='text' placeholder={resultsFilePath} className='font-bold' disabled/>
            <label htmlFor='results-file-path' className='settings-panel-button'>
              <input type="file" name='results-file-path' id='results-file-path' onChange={onResultsFileChanged}/>
              <AiFillSetting className='cursor-pointer' size={20}/>
            </label>
          </div>
        )
      }
    ],
    [executableFilePath, logFilePath, resultsFilePath]
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