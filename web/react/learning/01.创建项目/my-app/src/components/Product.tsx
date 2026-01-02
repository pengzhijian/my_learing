import { useLocation } from 'react-router-dom'

export function Product() {
  const location = useLocation()
  return (
    <>
      <h1>Product</h1>
      <p>{location.state}</p>
    </>
  )
}