import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'
import Routes from './components/Routes/Routes'

const App = () => {
  return (
    <div className='App'>
      <Header>
        <Menu />
      </Header>
      <Content>
        <Routes />
      </Content>
      <Footer />
    </div>
  )
}

export default App
