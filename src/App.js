import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function App() {
  const DB_API_URL = "http://localhost:8000"
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  const useStyles = makeStyles((theme) => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)', 
      border: 0,
      marginBottom: 15,
      borderRadius: 15,
      color: 'white',
      padding: '5px 30px'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
  }))

  const theme = createTheme({
    palette: {
      primary: {
        main: green[400]
      },
      secondary: {
        main: red[400]
      }
    },
    typography: {
      button: {
        fontFamily: 'Montserrat',
        textTransform: 'none'
      }
    }
  })

  const classes = useStyles();

  useEffect(() => {
      const getProducts = async () => {
          const productsResult = await getProductsList()
          setProducts(productsResult)
      }
      
      getProducts()
  }, [])

  const getProductsList = async () => {
      return await fetch(`${DB_API_URL}/products`)
              .then(res => res.json())
              .then(data => data)
  }

  const addToCart = (product) => {
    const itemExists = cartItems.find(x => x.id === product.id)
    if (itemExists) {
      setCartItems(cartItems.map(x => x.id === product.id ? {...itemExists, qty: itemExists.qty + 1} : x))
    } else {
      setCartItems([...cartItems, {...product, qty: 1}])
    }
  }

  const removeFromCart = (id) => {
      const itemExists = cartItems.find(x => x.id === id)

      if (itemExists.qty === 1) {
        setCartItems(cartItems.filter(x => x.id !== id))
      } else {
        setCartItems(cartItems.map(x => x.id === id ? {...itemExists, qty: itemExists.qty - 1} : x))
      }
  }

  return (
    <ThemeProvider theme={theme} >
      <Container maxWidth="lg">
        <div className="App">
          
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                MUI Theming
              </Typography>
              <Button> Login </Button>
            </Toolbar>
          </AppBar>
          
          <Header className="App-header" cartItemsCount={cartItems.length} ></Header>
          
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={3} sm={6}>
              <Paper style={{height: 75, width: '100%'}} />
            </Grid>
            <Grid item xs={3} sm={6}>
              <Paper style={{height: 75, width: '100%'}} />
            </Grid>
            <Grid item xs={3} sm={6}>
              <Paper style={{height: 75, width: '100%'}} />
            </Grid>
          </Grid>

          <div className="row">
            <Main addToCart={addToCart} products={products}></Main>
            <Basket addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems}></Basket>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
