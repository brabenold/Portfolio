import GlassDefs from './components/GlassDefs'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Bento from './components/Bento'
import Footer from './components/Footer'
import { useTheme } from './theme'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen">
      <GlassDefs />
      <Nav dark={dark} onToggle={toggle} />
      <Hero dark={dark} />
      <main>
        <Bento />
      </main>
      <Footer />
    </div>
  )
}
