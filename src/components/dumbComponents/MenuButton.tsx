import { forwardRef } from "react"
import { Button } from "@mui/material"
import MenuButtonPs from "../../interfaces/MenuButtonPs.interface"


const MenuButton = forwardRef((props: MenuButtonPs, ref: any) => {
    return (
        <Button
        ref={ref}
        onClick={props.onClick}
        sx={[
            {
            width: '90%',
            height: '5vh',
            backgroundColor: '#1FB6FF',
            color: 'white',
            ":hover": {
                backgroundColor: '#00000050',
                color: '#white'
            }
            },
            props.isActive === true && {
                backgroundColor: '#13CE66'
            }
        ]}
        >
            {props.name}
        </Button>
    )
})

export default MenuButton