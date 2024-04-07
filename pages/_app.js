import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [TotalAmount, setTotalAmount] = useState(0)
  const [user, setuser] = useState({value:null})
  const [key, setkey] = useState()
  const [progress, setProgress] = useState(0)

  const router=useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete',()=>{
      setProgress(100);
    })
    router.events.on('routerChangeStart',()=>{
      setProgress(40);
    })
    const token=localStorage.getItem("token");
    if(token){
      setuser({value:token})
      setkey(Math.random());
    }
    try {
      const storedCart = JSON.parse(localStorage.getItem("Cart"));
      const amount = JSON.parse(localStorage.getItem("TotalAmount"));
      // console.log("Stored Cart: ",storedCart)
      if (storedCart && amount) {
        setTotalAmount(amount);
        setCart(storedCart);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, [router.query]);

function Logout(){
  router.push("/login");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  setkey(Math.random());
  setuser({value:null});
}

function Add_to_cart(itemCode, price, qty, title,variant,size) {
    // console.log("Size of cart: ",cart.length)
    const existingItemIndex = cart.findIndex(item => item.itemCode === itemCode);
    // console.log(existingItemIndex)
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += qty;
      updatedCart[existingItemIndex].subTotal += price * qty;
      setTotalAmount(TotalAmount+price*qty);
      setCart(updatedCart);
      saveCart(updatedCart,TotalAmount+price*qty);
    } else {
      const newItem = {
        itemCode: itemCode,
        qty: qty,
        price: price,
        title:title,
        variant: variant,
        size:size,
        subTotal: price * qty
      };
      setTotalAmount(TotalAmount+newItem.subTotal);
      setCart(prevCart => {
        const mycart = [...prevCart, newItem];
        saveCart(mycart,TotalAmount+newItem.subTotal);
        return [...prevCart, newItem];
      });
    }
  }
  
 function Buy_Now(itemCode, price, qty, title,variant,size){
     Clear_the_Cart();
     const newItem = {
      itemCode: itemCode,
      qty: qty,
      price: price,
      title:title,
      variant: variant,
      size:size,
      subTotal: price * qty
    };
    setTotalAmount(newItem.subTotal);
    setCart(prevCart => {
      const mycart = [...prevCart, newItem];
      saveCart(mycart,newItem.subTotal);
      return [...prevCart, newItem];
    });
    router.push("/checkout");
 }

  async function saveCart(mycart,TotalAmount) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem("Cart", JSON.stringify(mycart));
        localStorage.setItem("TotalAmount", JSON.stringify(TotalAmount));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function Clear_the_Cart() {
    setTotalAmount(0);
    setCart([]);
    saveCart([],0); // Clear the cart in localStorage
  }

  function addQuantity(itemCode) {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(item => item.itemCode === itemCode);
    updatedCart[itemIndex].qty += 1;
    updatedCart[itemIndex].subTotal += updatedCart[itemIndex].price;
    setTotalAmount(TotalAmount+updatedCart[itemIndex].price);
    setCart(updatedCart);
    console.log(updatedCart);
    saveCart(updatedCart,TotalAmount+updatedCart[itemIndex].price);
  }

  function minusQuantity(itemCode) {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(item => item.itemCode === itemCode);
    if (updatedCart[itemIndex].qty > 1) {
      updatedCart[itemIndex].qty -= 1;
      updatedCart[itemIndex].subTotal -= updatedCart[itemIndex].price;
      setTotalAmount(TotalAmount-updatedCart[itemIndex].price);
      setCart(updatedCart);
      saveCart(updatedCart,TotalAmount-updatedCart[itemIndex].price);
    }
  }

  return (
    <>
     <LoadingBar
        color='rgb(99 102 241)'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar user={user} key={key} Logout={Logout} cart={cart} TotalAmount={TotalAmount} addQuantity={addQuantity} minusQuantity={minusQuantity} Add_to_cart={Add_to_cart} Clear_the_Cart={Clear_the_Cart} />
      <Component  Buy_Now={Buy_Now} TotalAmount={TotalAmount} cart={cart} addQuantity={addQuantity} minusQuantity={minusQuantity} Add_to_cart={Add_to_cart} Clear_the_Cart={Clear_the_Cart} {...pageProps} />
      <Footer />
    </>
  );
}
