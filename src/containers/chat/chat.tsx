import { IconButton, Paper, Theme } from "@mui/material"
import { Send } from '@mui/icons-material'
import { makeStyles, createStyles } from '@mui/styles'
import { FormEvent, useEffect, useState } from "react"
import { io } from "socket.io-client"
import Message from "../../components/messages/message"
import { IMessage } from "../../interfaces/messages.interface"

const socket = io('http://localhost:8080/messages')

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: "90vw",
            height: "80vh",
            maxWidth: "600px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: '100vm'
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        }
    })

)

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const classes = useStyles()



    const handleSubmitNewMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('message', currentMessage)
        setMessages([...messages, { from: 'me', text: currentMessage, direction: "row-reverse" }])
        setCurrentMessage('')

    }

    useEffect(() => {
        const handleNewMessage = (message: any) => {
            setMessages([...messages, {...message, direction: 'row'}])
        }
        socket.on('message', handleNewMessage)

        return () => {
            socket.off('message', handleNewMessage);
        }
    }, [messages])

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Paper id="style-1" className={classes.messagesBody}>
                    {messages.map((item) => {
                        return <Message text={item.text} from={item.from} direction={item.direction} />
                    })}
                </Paper>
                <form onSubmit={e => handleSubmitNewMessage(e)}>
                    <input type="text" onChange={e => setCurrentMessage(e.target.value)} value={currentMessage} />
                    <IconButton type="submit">{<Send color="success"/>}</IconButton>
                </form>
            </Paper>

        </div >
    )
}

export default Chat