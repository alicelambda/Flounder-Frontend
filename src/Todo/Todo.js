import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import TodoCard from './TodoCard'
import Grid from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Reward from '../Reward/Reward';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import New from './New';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(9),
        left: theme.spacing(6),
        zIndex: 510000,
    }
}));




export default function Todo(props) {

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [severity, setSeverity] = React.useState("success");
    const [todos, setTodos] = React.useState([]);
    const classes = useStyles();
    const API_URL = window.API_URL;
    const [coins, setCoins] = React.useState(0);
    const [newOpen, setNewOpen] = React.useState(false);

    const updateMsg = (msg, severity) => {
        setOpen(true);
        setMsg(msg);
        setSeverity(severity);
    }


    const getTodoData = () => {
        fetch(API_URL + "/api/todo/all", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookie: props.cookie
            })
        })
            .then(response => response.json())
            .then(data => {
                setTodos(data.todos)
            })

    }

    React.useEffect(() => {
        getTodoData()
    }, []);

    const removeMainTodo = (todoid, title) => {
        const filteredTodos = todos.filter(todo => {
            return todo.id !== todoid;
        })
        fetch(API_URL + '/api/todo/remove', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: todoid,
                cookie: props.cookie
            })
        }).then(response => response.json())
            .then(data => {
                new Notification("Finished " + title, {
                    "icon": "https://todo.alicereuter.com/favicon.ico",
                    "body": "Got " + data.coins + " thought coins"
                });
                setCoins(coins + data.coins);
                updateMsg("got coins: " + data.coins + " time ", severity);
            })

        setTodos(filteredTodos);
    }

    const pushTodo = (data) => {
        console.log(data);
        var newTodos = todos.slice();
        newTodos.unshift(data);
        setTodos(newTodos);
    }



    const todoItems = todos.map(item => {


        const description = item.description + "Due In:" + item.delta;
        const title = item.title;
        return <TodoCard
            key={item.id}
            item={item}
            cookie={props.cookie}
            description={description}
            title={title}
            coins={coins}
            setCoins={setCoins}
            removeMainTodo={removeMainTodo}
            updateMsg={updateMsg}
        />
    }
    )
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const newHandleClose = () => {
        setNewOpen(false);
    };


    const newHandleClickOpen = () => {
        setNewOpen(true);
    };



    return (
        <div className={classes.root}>
            <New
                open={newOpen}
                coins={coins}
                setCoins={setCoins}
                onClose={newHandleClose}
                pushTodo={pushTodo}
                cookie={props.cookie}
            />
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                align="center"
                spacing={4}
            >
                <Fab variant="extended"
                    className={classes.fab}
                    color="secondary"
                    onClick={newHandleClickOpen}
                    aria-label="add">
                    <AddIcon />
                    Create
                </Fab>
                {todoItems.slice(0, 3)}
                {todoItems.slice(6,10)}
                <Reward
                    coins={coins}
                    setCoins={setCoins}
                    cookie={props.cookie}
                />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Grid>


        </div>
    )

}
