import { createTheme, IconButton, Input, Paper, Theme } from "@mui/material"
import { Send } from '@mui/icons-material'
import { makeStyles, createStyles } from '@mui/styles'
import { FormEvent, useEffect, useRef, useState } from "react"
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
            position: "relative",
        },
        container: {
            width: '100vm'
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "auto",
            height: "calc( 100% - 80px )"
        },
        form: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: 5,

        },
        wrapText: {
            width: '100%'
        }
    })
)

const Chat: React.FC = () => {
    const scrollRef = useRef<any>(null)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const classes = useStyles(createTheme({ palette: { mode: "dark" } }))

    const handleSubmitNewMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentMessage.length === 0) return
        socket.emit('message', currentMessage)
        setMessages([...messages, { from: 'me', text: currentMessage, direction: "row-reverse" }])
        setCurrentMessage('')
    }

    useEffect(() => {
        const handleNewMessage = (message: any) => {
            setMessages([...messages, { ...message, direction: 'row' }])
        }
        socket.on('message', handleNewMessage)
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" })
        }

        return () => {
            socket.off('message', handleNewMessage);
        }
    }, [messages])


    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Paper id="style-1" className={classes.messagesBody}>
                    {messages.map((item, key) => {
                        return <Message key={key} text={item.text} from={item.from} direction={item.direction} />
                    })}
                    <li style={{visibility: "hidden"}} ref={scrollRef}/>
                </Paper>
                <form className={classes.form} onSubmit={e => handleSubmitNewMessage(e)}>
                    <Input className={classes.wrapText} size="medium" placeholder="type something" type="text" onChange={e => setCurrentMessage(e.target.value)} value={currentMessage} />
                    <IconButton type="submit">{<Send color="success" />}</IconButton>
                </form>
            </Paper>

        </div >
    )
}

export default Chat