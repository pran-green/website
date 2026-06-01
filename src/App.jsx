import Navbar from './components/Navbar'
import ScrollStory from './components/ScrollStory'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Product from './components/Product'
import Impact from './components/Impact'
import Team from './components/Team'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'

export default function App() {
  return (
    <>
      <ParticleField />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <ScrollStory />
        <Problem />
        <Solution />
        <Product />
        <Impact />
        <Team />
        <Contact />
      </div>
    </>
  )
}
