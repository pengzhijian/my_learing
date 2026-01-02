import { useState } from 'react'
export function ListDom() {
  const [list, setList] = useState([1,2,3])
  return       list.map((item) => (
        <div key={item}>{item}</div>
      ))
}