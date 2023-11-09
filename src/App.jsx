import { useCookies } from 'react-cookie'
import { Box, Container } from '@mui/material'
import styled from '@emotion/styled'
import ProtectedRoute from './components/ProtectedRoute'
import Characters from './components/Characters'
import MenuBar from './components/MenuBar'
import BackgroundImg from './assets/images/marvel-comic-book-background-0exuprkk5cwj6ail.jpg'


const AppContainerSx = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  margin: '0',
  padding: '0',
  '@media (min-width: 600px)': {
    padding: '0',
  },
}

const AppBoxSx = {
  height: '100vh',
  zIndex: 999
}

const BackgroundImage = styled('img')({
  opacity: '0.2',
  filter: 'grayscale(20%)',
  position: 'absolute',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: '0'
})

function App() {
  const [cookies, setCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])

  if(!cookies.privateApiKey || !cookies.privateApiKey) {
    setCookies('isAuthenticated', false)
  }
  
  return (
    <ProtectedRoute>
      <Container maxWidth={false} sx={AppContainerSx} className="App">
        <BackgroundImage src={BackgroundImg}/>
        <MenuBar/>
        <Box component='main' sx={AppBoxSx}>
          <Characters/>
        </Box>
      </Container>
    </ProtectedRoute>
  )
}

export default App
