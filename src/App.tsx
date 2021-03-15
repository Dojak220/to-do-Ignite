import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import { ToastProvider } from 'react-toast-notifications'

import './styles/global.scss'


export function App() {
  return (
    <ToastProvider>
      <Header />
      <TaskList />
    </ToastProvider>
  )
}