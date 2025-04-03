import {Routes, Route } from 'react-router-dom'

import Tickets from './pages/Tickets' 
import Layout from './pages/Layout'

function App() {
  return (
        <div className={"container"}>
            <Routes>
              <Route path="/" element = {<Layout />}>
                <Route index element={<Tickets />} />
                {/* <Route  element={<Review />} /> */}
              </Route>
            </Routes>
        </div>
  )
}

export default App
