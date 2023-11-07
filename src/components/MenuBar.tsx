import { useState, useEffect, createRef } from 'react'
import MenuButtonPs from '../interfaces/MenuButtonPs.interface'
import MenuButton from './dumbComponents/MenuButton'
import { Box, Container } from '@mui/material'
import LogOutButton from './logOutButton'


const menuContainerSx = {
  display: 'grid',
  alignItems: 'center',
  height: '100vh'
}

const menuBoxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '50vh',
  width: '15vw',
  gap: '1vh',
  backgroundColor: '#00000050'
}

export default function MenuBar() {
    const [menuButtons, setMenuButtons] = useState<MenuButtonPs[]>([])
    const [activedButton, setActivedButton] = useState<number>(0)

    useEffect(() => {
        setMenuButtons([
          {
            name: 'Characters'
          },
        ])
      },[])

      function activeButton(id: number) {
        setActivedButton(id)
      }
      
    return (
        <Container sx={menuContainerSx}>
          <Box sx={menuBoxSx}>
            {menuButtons.map((button, i) => {
              const intervalRef = createRef<any>()
              const isActive = activedButton !== undefined && i === activedButton ? true : false

              return <MenuButton ref={intervalRef} key={i} onClick={() => activeButton(i)} name={button.name} isActive={isActive}/>
            })}
          </Box>
          <LogOutButton/>
        </Container>
    )
}