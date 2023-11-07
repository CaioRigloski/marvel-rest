import { Button } from "@mui/material"
import ViewButtonPs from "../../interfaces/ViewButtonPs.interface"

export default function ViewButton(props: ViewButtonPs) {

    return (
        <Button
        onClick={props.onClick}
        sx={{
            width: '10rem',
            minWidth: 'max-content',
            backgroundColor: '#273444',
            color: 'white',
            ":hover": {
                backgroundColor: '#00000050',
                color: 'white'
            }
        }}
        >
            {props.name}
        </Button>
    )
}