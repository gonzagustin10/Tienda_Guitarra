import {useState,useEffect} from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db'

function App() {
  //state
  
  const[data, setData] = useState([])

  useEffect(()=>{
    setData(db)
  },[])  

  const [cart, setCart] = useState([])

  function addToCart(item){
    const itemExist = cart.findIndex( guitar => guitar.id === item.id)
    
    if(itemExist>=0){//existe
      if(cart[itemExist].quantity >= 5) return
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else{
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < 5 ){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    const updateCart= cart.map (item => {
      if (item.id === id && item.quantity > 1 ){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  return (
    <>
    <Header
      cart={cart}
      removeFromCart = {removeFromCart}
      increaseQuantity= {increaseQuantity}
      decreaseQuantity= {decreaseQuantity}
      />  
      
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar
              key={guitar.id}
              guitar = {guitar}
              setCart = {setCart}
              addToCart= {addToCart}
              />
          ))}
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
