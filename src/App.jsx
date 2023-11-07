import CharacterBox from './components/CharacterBox'
import MenuBar from './components/MenuBar'
import { Box, Container } from '@mui/material'
import BackgroundImg from './assets/images/marvel-comic-book-background-0exuprkk5cwj6ail.jpg'
import styled from '@emotion/styled'
import Authenticate from './components/Authenticate'
import { useCookies } from 'react-cookie'


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
    <Container maxWidth={false} sx={AppContainerSx}>
      {cookies?.isAuthenticated ?
      <>
        <BackgroundImage src={BackgroundImg}/>
        <MenuBar/>
        <Box component='main' className="App" sx={AppBoxSx}>
          <CharacterBox/>
        </Box>
      </>
      : <Authenticate/>}
    </Container>
  )
}

export default App
