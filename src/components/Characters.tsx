import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Md5 } from 'ts-md5'
import { Box, ButtonGroup, Card, Container, SxProps, styled } from '@mui/material'
import ViewButton from './dumbComponents/ViewButton'
import CharactersPs from '../interfaces/CharactersPs.interface'


const boxSx = {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
}

const containerSx = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'max-content',
    height: '90%',
    overflow: 'hidden',
    border: '1px solid black',
    backgroundColor: '#00000050',
    borderRadius: '5em',
    '@media (min-width: 600px)': {
        padding: '0 30% 0 30%',
    },
    '@media (min-width: 1200px)': {
        maxWidth: '60vw'
    },
}

const buttonGroupSx = {
    height: '10vh',
    alignItems: 'center'
}

const cardSx = (index: number, carouselIndex: number) : SxProps => {
    return [
        {   
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#F8B700',
            minWidth: '22rem',
            height: '25rem',
            border: '1px solid white',
            borderRadius: '1.5rem',
            fontFamily: 'fantasy',
            color: '#FFD55F',
            WebkitTextStroke: '1px #273444',
        },
        index === carouselIndex && {
            border: '1px solid black',
            scale: '1.2',
            transition: 'all 1s ease-out',
            zIndex: '999',
            cursor: 'pointer',
            '&:hover': {
                width: '22rem',
                minHeight: '25rem',
                height: 'max-content',
                position: 'absolute'
            }
        },
    ]
}

const CharacterName = styled('p')({
    border: '1px solid black',
    backgroundColor: '#FF5216',
    textAlign: 'center',
    width: '100%',
})

const CharacterImg = styled('img')({
    padding: '0 4em',
    backgroundColor: '#FF5216',
    width: '200px',  
    height: '200px',
    border: '1px solid black',
})

const CardDescription = styled('p')({
    border: '1px solid black',
    padding: '1em',
    margin: '1em',
    borderRadius: '1em',
    color: 'white',
    backgroundColor: '#FF5216',
    WebkitTextStroke: '0',
    fontFamily: 'monospace'
})


export default function Characters() {
    const [cookies, setCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])
    const [characters, setCharacters] = useState<CharactersPs[]>([])
    const [carouselIndex, setCarouselIndex] = useState<number>(0)
    const [view, setView] = useState<ScrollLogicalPosition | undefined>()
    const scrollRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
       const privateApiKey = cookies.privateApiKey
       const publicApiKey = cookies.publicApiKey
       const ts = Number(new Date())
       const hash = Md5.hashStr(ts + privateApiKey + publicApiKey)

       async function requestCharacters() {
           await axios.get('http://gateway.marvel.com/v1/public/characters', {
               params: {
                   'limit': 10,
                   'apikey': publicApiKey,
                   'ts': ts,
                   'hash': hash,
               },
           }).then(response => {
            const chs = response.data.data.results
            setCharacters(chs)
           }).catch(err => {
               console.log(err)
           })
       }
       requestCharacters()
   }, [])

    const offSetContainer = containerRef.current?.getBoundingClientRect()
    const cardWidth = scrollRef.current?.getBoundingClientRect()

    useEffect(() => {})
    if(carouselIndex === 0) {
        containerRef.current?.scrollTo({left: 0})
    } else if (carouselIndex === characters.length - 1) {
        if(offSetContainer?.right !== undefined && cardWidth?.width !== undefined) {
            const leftScroll = offSetContainer?.right ** 2
            containerRef.current?.scrollTo({left: leftScroll})
        }
    }
    else {
        scrollRef.current?.scrollIntoView({inline:view, behavior: 'smooth'})
    }

    function plusCarouselIndex() {
        if(carouselIndex < characters.length - 1) {
            setCarouselIndex(carouselIndex + 1)
        } else {
            setCarouselIndex(0)
        }
        setView('start')
    }
    
    function minusCarouselIndex() {
        if(carouselIndex >= 1) {
            setCarouselIndex(carouselIndex - 1)
        } else {
            setCarouselIndex(characters.length - 1)
        }
        setView('end')
    }

    return (
        <Box component="div" sx={boxSx}>
            <Container
            ref={containerRef}
            sx={containerSx}>
            {characters.map((character: CharactersPs, index: number) => {
                return (
                <Card
                    key={character.id}
                    component="div"
                    ref={index === carouselIndex ? scrollRef : null}
                    sx={cardSx(index, carouselIndex)}
                >
                    <CharacterName>{character.name}</CharacterName>
                    <CharacterImg src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='Character picture'></CharacterImg>
                    <CardDescription>{character.description.length > 0 ? character.description : 'No description'}</CardDescription>
                </Card>
                )
            })
            }
            </Container>

            <ButtonGroup variant='outlined' sx={buttonGroupSx}>
                <ViewButton name='Previous' onClick={minusCarouselIndex}></ViewButton>
                <ViewButton name='Next' onClick={plusCarouselIndex}></ViewButton>
            </ButtonGroup>
        </Box>
    )
}

