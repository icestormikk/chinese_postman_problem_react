import React from "react";
import { SidebarButtonProps } from "@/types/SidebarButtonProps";
import SidebarButton from "./SidebarButton";
import { FaCircleNodes } from "react-icons/fa6";
import { SlGraph, SlSettings } from "react-icons/sl";
import { PiGraph } from "react-icons/pi";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import Modal from "../Modal";
import SettingsScreen from "@/screens/settings/SettingsScreen";
import UploadScreen from "@/screens/upload/UploadScreen";
import NodesScreen from "@/screens/nodes/NodesScreen";
import EdgesScreen from "@/screens/edges/EdgesScreen";
import LaunchScreen from "@/screens/algorithm/LaunchScreen";
import { useAppSelector } from "@/libs/redux/hooks";
import DownloadScreen from "@/screens/download/DownloadScreen";
import ResultScreen from "@/screens/result/ResultScreen";
import BuildRandomGraphScreen from "@/screens/graph/BuildRandomGraphScreen";


function Sidebar() {
  const { response } = useAppSelector((state) => state.main)
  const [isBuildRandomGrapModalOpen, setIsBuildRandomGrapModalOpen] = React.useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false)
  const [isNodesModalOpen, setIsNodesModalOpen] = React.useState(false)
  const [isEdgesModalOpen, setIsEdgesModalOpen] = React.useState(false)
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = React.useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false)
  const buttons = React.useMemo<SidebarButtonProps[]>(
    () => {
      return [
        {title: 'Создать случайный граф', icon: <PiGraph size={20}/>, onClick: () => { setIsBuildRandomGrapModalOpen(true) }},
        {title: 'Список вершин', icon: <FaCircleNodes size={20}/>, onClick: () => { setIsNodesModalOpen(true) }},
        {title: 'Список рёбер', icon: <SlGraph size={20}/>, onClick: () => { setIsEdgesModalOpen(true) }},
        {title: 'Конфигурация приложения', icon: <SlSettings size={20}/>, onClick: () => { setIsSettingsModalOpen(true) }},
        {title: 'Загрузить граф из файла', icon: <MdOutlineFileUpload size={20}/>, onClick: () => { setIsUploadModalOpen(true) }},
        {title: 'Выгрузить граф в файл', icon: <MdOutlineFileDownload size={20}/>, onClick: () => { setIsDownloadModalOpen(true) }},
        {title: 'Запуск алгоритма',  icon: <VscDebugStart size={20}/>, onClick: () => { setIsAlgorithmModalOpen((prevState) => !prevState) } },
        {title: 'Просмотр результата', isDisabled: response?.data.result === undefined, icon: <TbReport size={20}/>, onClick: () => { setIsResultModalOpen(true) } },
      ]
    },
    [response?.data.result, setIsSettingsModalOpen, setIsUploadModalOpen, setIsNodesModalOpen, setIsEdgesModalOpen, setIsAlgorithmModalOpen]
  )

  return (
    <aside className="h-dvh w-14 text-black flex flex-col bg-gray-300 fixed right-0 top-0">
      {
        buttons.map((button, index) => (
          <SidebarButton key={index} title={button.title || ''} onClick={button.onClick} isDisabled={button.isDisabled}>
             {button.icon}
          </SidebarButton>
        ))
      }
      {
        isBuildRandomGrapModalOpen && (
          <Modal 
            isOpen={isBuildRandomGrapModalOpen} 
            title="Создать случайный граф" 
            hasCloseBtn={true} 
            onClose={() => setIsBuildRandomGrapModalOpen(false)}
          >
            <BuildRandomGraphScreen/>
          </Modal>
        )
      }
      {
        isSettingsModalOpen && (
          <Modal 
            isOpen={isSettingsModalOpen} 
            title="Конфигурация приложения" 
            hasCloseBtn={true} 
            onClose={() => setIsSettingsModalOpen(false)}
          >
            <SettingsScreen/>
          </Modal>
        )
      }
      {
        isUploadModalOpen && (
          <Modal 
            isOpen={isUploadModalOpen} 
            title="Загрузка графа из файла" 
            hasCloseBtn={true} 
            onClose={() => setIsUploadModalOpen(false)}
          >
            <UploadScreen onScreenClose={() => setIsUploadModalOpen(false)}/>
          </Modal>
        )
      }
      {
        isDownloadModalOpen && (
          <Modal 
            isOpen={isDownloadModalOpen} 
            title="Выгрузка графа в файл" 
            hasCloseBtn={true} 
            onClose={() => setIsDownloadModalOpen(false)}
          >
            <DownloadScreen/>
          </Modal>
        )
      }
      {
        isNodesModalOpen && (
          <Modal 
            isOpen={isNodesModalOpen} 
            title="Список всех вершин в графе" 
            hasCloseBtn={true} 
            onClose={() => setIsNodesModalOpen(false)}
          >
            <NodesScreen/>
          </Modal>
        )
      }
      {
        isEdgesModalOpen && (
          <Modal 
            isOpen={isEdgesModalOpen} 
            title="Список всех рёбер в графе" 
            hasCloseBtn={true} 
            onClose={() => setIsEdgesModalOpen(false)}
          >
            <EdgesScreen/>
          </Modal>
        )
      }
      {
        isAlgorithmModalOpen && (
          <Modal 
            isOpen={isAlgorithmModalOpen} 
            title="Алгоритм" 
            hasCloseBtn={true} 
            onClose={() => setIsAlgorithmModalOpen(false)}
          >
            <LaunchScreen/>
          </Modal>
        )
      }
      {
        isResultModalOpen && (
          <Modal 
            isOpen={isResultModalOpen} 
            title="Результат работы алгоритма" 
            hasCloseBtn={true} 
            onClose={() => setIsResultModalOpen(false)}
          >
            <ResultScreen/>
          </Modal>
        )
      }
    </aside>
  );
}

export default Sidebar;