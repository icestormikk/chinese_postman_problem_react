import React from "react";
import { SidebarButtonProps } from "@/types/SidebarButtonProps";
import SidebarButton from "./SidebarButton";
import { FaCircleNodes } from "react-icons/fa6";
import { SlGraph, SlSettings } from "react-icons/sl";
import { MdOutlineFileUpload } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import Modal from "../Modal";
import SettingsScreen from "@/screens/settings/SettingsScreen";
import UploadScreen from "@/screens/upload/UploadScreen";
import NodesScreen from "@/screens/nodes/NodesScreen";
import EdgesScreen from "@/screens/edges/EdgesScreen";
import LaunchScreen from "@/screens/algorithm/LaunchScreen";


function Sidebar() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false)
  const [isNodesModalOpen, setIsNodesModalOpen] = React.useState(false)
  const [isEdgesModalOpen, setIsEdgesModalOpen] = React.useState(false)
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = React.useState(false)
  const buttons = React.useMemo<SidebarButtonProps[]>(
    () => {
      return [
        {title: 'Список вершин', icon: <FaCircleNodes size={20}/>, onClick: () => { setIsNodesModalOpen(true) }},
        {title: 'Список рёбер', icon: <SlGraph size={20}/>, onClick: () => { setIsEdgesModalOpen(true) }},
        {title: 'Конфигурация приложения', icon: <SlSettings size={20}/>, onClick: () => { setIsSettingsModalOpen(true) }},
        {title: 'Загрузить граф из файла', icon: <MdOutlineFileUpload size={20}/>, onClick: () => { setIsUploadModalOpen(true) }},
        {title: 'Запуск алгоритма',  icon: <VscDebugStart size={20}/>, onClick: () => { setIsAlgorithmModalOpen(true) } }
      ]
    },
    []
  )

  return (
    <aside className="h-dvh w-14 text-black flex flex-col bg-gray-300 fixed right-0 top-0">
      {
        buttons.map((button, index) => (
          <SidebarButton key={index} title={button.title || ''} onClick={button.onClick}>
             {button.icon}
          </SidebarButton>
        ))
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
    </aside>
  );
}

export default Sidebar;