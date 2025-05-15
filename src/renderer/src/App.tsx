import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import LayoutComp from './components/Layout'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
    <LayoutComp/>

      {/* <Versions></Versions> */}
    </>
  )
}

export default App
