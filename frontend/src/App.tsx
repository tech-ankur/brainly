
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
 

  return (
<div>
  <BrowserRouter>
  <Routes>
    <Route path='/signup' element={<Signup/>}></Route>
     <Route path='/' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
  </Routes>
  </BrowserRouter>
  
    </div>
  )
}

export default App
