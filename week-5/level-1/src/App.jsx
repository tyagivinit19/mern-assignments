import './App.css'
import Card from './components/Card'

function App() {
  // Name
  // - A short description
  // - LinkedIn, Twitter and other Social Media Handle buttons
  // - Interests Section
  const userData = {
    name: 'Vinit Tyagi',
    description: "Test description",
    interests: ['PHP', 'React', 'Node JS'],
    socials: [{name: 'LinkedIn', link:"https://www.linkedin.com/"}, {name: 'Twitter', link:"https://twitter.com/"}],

  }

  return (
    <>
    <Card userData={userData}></Card>
    </>
  )
}

export default App
