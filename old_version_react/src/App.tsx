import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'
import Routes from './components/Routes/Routes'
import { ThemeProvider } from 'styled-components'
import theme from './Theme/Theme'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Header>
          <Menu />
        </Header>
        <Content>
          <Routes />
        </Content>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
