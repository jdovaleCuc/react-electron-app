import { Avatar, Chip, Stack, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import React from 'react'
import { IMessage } from '../../interfaces/messages.interface'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageLeft: {
            position: "relative",
            backgroundColor: '#f8e896',
            width: "60%",
            borderRadius: "10px",
        },
        messageRigth: {
            position: "relative",
            backgroundColor: '#A8DDFD',
            width: "60%",
            borderRadius: "10px",
        },
        messageContent: {
            padding: 0,
            margin: 10
        },
        container: {
            marginTop: 2
        },
        containerName: {
            marginTop: 5
        }
    })

)

const Message: React.FC<IMessage> = (message) => {
    const classes = useStyles()
    return (
        <>
            <Stack className={classes.containerName} direction={message.direction} spacing={1}>
                <Chip avatar={<Avatar>{message.from[0]}</Avatar>} label={message.from} size='small' />
            </Stack>
            <Stack className={classes.container} direction={message.direction} spacing={1}>
                <div className={message.direction === 'row' ? classes.messageLeft : classes.messageRigth}>
                    <p className={classes.messageContent} >{message.text}</p>
                </div>
            </Stack>
        </>


    )
}

export default Message