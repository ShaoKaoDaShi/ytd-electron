
import LayoutComp from './components/Layout'
import { RoutesList } from './components/RoutesList'
import { BrowserRouter, Route, Routes } from 'react-router'
import '../src/assets/main.css'

function App(): React.JSX.Element {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/*" element={<LayoutComp>
      <RoutesList />
    </LayoutComp>} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
