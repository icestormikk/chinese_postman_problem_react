import ErrorMessage from '@/components/messages/ErrorMessage';
import SuccessMessage from '@/components/messages/SuccessMessage';
import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';

function DownloadScreen() {
  const { nodes, edges } = useAppSelector((state) => state.graph)
  const [appPath, setAppPath] = React.useState("")
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [successfulMessages, setSuccessfulMessages] = React.useState<string[]>([])

  const onDownload = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsDownloading(true)
      setErrors([])
      setSuccessfulMessages([])

      try {
        const data = JSON.stringify({ nodes, edges }, null, 2)
        const dir = await window.electron.getAppDirectory()
        const filename = 'graph-downloaded-data.json'
        const fullpath = `${dir}\\${filename}`

        await window.electron.writeToFile(fullpath, data)
        setSuccessfulMessages([`Информация о графе была успешно сохранена в файл по пути: ${fullpath}`])
      } catch (e: any) {
        setErrors((prevState) => [...prevState, e.message])
      }

      setIsDownloading(false)
    },
    []
  )

  React.useEffect(
    () => {
      const getData = async () => {
        const path = await window.electron.getAppDirectory()
        setAppPath(path)
      }

      getData()
    },
    []
  )

  return (
    <div className='block space-y-2'>
      <p>{`Здесь вы можете выгрузить информацию о текущем графе в отдельный JSON-файл. Файл будет создан в той же директории, что и приложение (${appPath})`}</p>
      <form onSubmit={(event) => onDownload(event)} className='flex flex-col justify-start items-start'>
        <button className='bg-green-500 text-white'>Выгрузить</button>
        {
          successfulMessages.map((sm, index) => <SuccessMessage key={index} message={sm}/>)
        }
        {
          errors.map((error, index) => <ErrorMessage key={index} message={error}/>)
        }
      </form>
    </div>
  );
}

export default DownloadScreen