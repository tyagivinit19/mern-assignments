import { useRef, useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [sum, setSum] = useState(0)
  const sumRef = useRef(0)

  function inputChange() {
    console.log(sumRef.current.value)
    let n = parseInt(sumRef.current.value);
    setSum(n*(n+1)/2);
  }

  return <>
  <input type="text" ref={sumRef} onChange={inputChange}/>
  <h4>The sum is {sum}</h4>
  <button onClick={() => setCount(count+1)}>Counter ({count})</button>
  </>

}

export default App
