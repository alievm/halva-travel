import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/homepage'
import Tour from '../pages/tour'
import NewsDetails from '../pages/news/news-detail'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tours/:slug" element={<Tour />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
