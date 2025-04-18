import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailPage'
import AppLayout from './components/AppLayout'
import NewsPage from './pages/NewsPage';
import ForumPage from './pages/ForumPage';
import SocialPage from './pages/SocialPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/api/reviews" index element={<HomePage />} />
            <Route path="api/reviews/:id" element={<DetailsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/social" element={<SocialPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
