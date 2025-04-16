import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailPage'
import AppLayout from './components/AppLayout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/api/reviews" index element={<HomePage />} />
            <Route path="api/reviews/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
