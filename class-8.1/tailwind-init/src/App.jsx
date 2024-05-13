import './App.css'
import './components/RevenueCard'
import RevenueCard from './components/RevenueCard'

function App() {

  return (
    <>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ border: '2px solid red' }}>Hello1</div>
        <div style={{ border: '2px solid red' }}>Hello2</div>
        <div style={{ border: '2px solid red' }}>Hello3</div>
      </div> */}
      {/* <div className='flex md:justify-between text-white flex-col md:flex-row'>
        <div className='bg-red-500'>Hello1</div>
        <div className='bg-green-500'>Hello2</div>
        <div className='bg-blue-500'>Hello3</div>
      </div> */}  

      <RevenueCard title={'Amount Pending'} showWarning={true} orderCount={5} amount={'9,567,234'}/>
    </>
  )
}

export default App
