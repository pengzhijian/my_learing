import { ListDom } from './list'
import { NavLink, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home } from './components/Home'
import { Product } from './components/Product'
import { About } from './components/About'
import { Error } from './components/Error'
import { useNavigate } from 'react-router-dom'
import { For } from './components/learn/For'
import { Effect } from './components/learn/Effect'
import { Provider } from './components/learn/Privider'


import './App.css'

function App() {
  const navigate = useNavigate()
  return (
    <>
      <ListDom />
      <NavLink to="">首页</NavLink>
      <NavLink to="product" state={'from product'}>产品</NavLink>
      <NavLink to="about">关于</NavLink>
      <Link to="/">返回首页</Link>
      <a href="" onClick={() => navigate('/settings?a=123')}>自定义</a>
      <Link
        to={{
          pathname: "/settings",
          search: "?sort=date",
          hash: "#hash"
        }}
      >
        设置
      </Link>
      <NavLink to="for">For</NavLink>
      <NavLink to="effect">Effect</NavLink>
      <NavLink to="provider">Provider</NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="about" element={<About />} />
        <Route path="for" element={<For />} />
        <Route path="effect" element={<Effect />} />
        <Route path="provider" element={<Provider />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
