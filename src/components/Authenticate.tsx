import { Alert, Button, Container, FormControl, FormGroup, Input, InputLabel, styled } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import { Md5 } from 'ts-md5'
import CredentialsAuth from "../interfaces/CredentialsAuth.interface"
import { useCookies } from 'react-cookie'
import BackgroundImg from '../assets/images/marvel-comic-book-background-0exuprkk5cwj6ail.jpg'


const BackgroundImage = styled('img')({
    opacity: '0.2',
    filter: 'grayscale(20%)',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1'
  })

const ContainerSx = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    margin: '0',
    '@media (min-width: 600px)': {
        padding: '0',
      },
}

const FormGroupSx = {
    display: 'flex',
    flexDirection: 'column',
    aligItems: 'center',
    justifyContent: 'center',
    width: '15vw',
    height: '50vh',
    backgroundColor: '#3C4858ad',
    border: '1px solid white',
    gap: '1rem',
    padding: '3%',
    'label': {
        color: 'white',
        "&.Mui-focused": {
            color: "#FF7849"
          }
    },
    'input': {
        color: 'white',
        border: '1px solid black',
    },
    'button': {
        backgroundColor: '#1FB6FF',
        color: 'white'
    }
}

export default function Authenticate() {
    const [cookies, setCookies] = useCookies(['publicApiKey', 'privateApiKey', 'isAuthenticated'])
    const [errorMessage, setErrorMessage] = useState<String>('')
    const [credentials, setCredentials] = useState<CredentialsAuth>({
        privateKey: '',
        publicKey: ''
    })

    function setPrivateKey(e: any) {
        setCredentials({
            privateKey: e.target.value,
            publicKey: credentials.publicKey
        })
    }

    function setPublicKey(e: any) {
        setCredentials({
            publicKey: e.target.value,
            privateKey: credentials.privateKey
        })
    }

    function requestLogIn() {
        const privateApiKey = credentials.privateKey
        const publicApiKey = credentials.publicKey
        const ts = Number(new Date())
        const hash = Md5.hashStr(String(ts) + privateApiKey + publicApiKey)
        
        if(!privateApiKey || !publicApiKey) {
            setErrorMessage('Private or public key not provided.')
        } else {
            async function requestCharacters() {
                await axios.get('http://gateway.marvel.com/v1/public/characters', {
                    params: {
                        'limit': 1,
                        'apikey': publicApiKey,
                        'ts': ts,
                        'hash': hash,
                    },
                }).then(response => {
                 if(response.status === 200) {
                    setCookies('privateApiKey', privateApiKey)
                    setCookies('publicApiKey', publicApiKey)
                    setCookies('isAuthenticated', true)
                 }
                }).catch(err => {
                    if(err.response.status === 401) {
                        setErrorMessage('Wrong private or public key.')
                    }
                })
            }
            requestCharacters()
        }
    }

    return (
        <>
        <BackgroundImage src={BackgroundImg}/>
        <Container sx={ContainerSx} maxWidth={false}>
            <FormGroup sx={FormGroupSx}>
                <FormControl>
                    <InputLabel>Private API key</InputLabel>
                    <Input id="private-key" type="text" name="privateKey" onChange={setPrivateKey} value={credentials?.privateKey}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Public API key</InputLabel>
                    <Input id="public-key" type="text" name="publicKey" onChange={setPublicKey} value={credentials?.publicKey}></Input>
                </FormControl>
                <Button onClick={requestLogIn}>LogIn</Button>
            {errorMessage.length > 0 ? <Alert severity="error">{errorMessage}</Alert> : false}
            </FormGroup>
        </Container>
        </>
    )
}