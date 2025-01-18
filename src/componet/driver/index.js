import React, { useEffect, useState } from 'react';
import { Button, Drawer, message } from 'antd';

import {addProductToCart, getCartProducts} from "../../function/localstorage"
import CheckOut from '../../layout/checkout';
import axios from 'axios';
import { Api__url } from '../../api/config';
import { useSelector } from 'react-redux';
const App = ({open,setOpen}) => {
  const [apidata,setApiData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart,setCart] = useState(getCartProducts())


  function deleteCart(data) {
    let getCart = getCartProducts()
    if(getCart.find(v => v === data.id)){
      const filterData = getCart.filter(v => Number(v) !== Number(data.id))
      addProductToCart(filterData)
      message.error("Product removed from Cart")
    }
    
  }
  
  
  
  const count = useSelector((state) => state.counter)
  
  
  
  const filterData = apidata.filter(v => v?.id && cart.includes(v.id)) 
  
  useEffect(()=>{
    async function getUser() {
      try {
          const response = await axios.get(Api__url);
          setApiData(response.data.data)
      } catch (error) {
          console.error(error);
      }
    }
    getUser()
  },[])
  
  const onClose = () => {
    setOpen(false);
  };
  
  const CartFooter = () => {
    
    
    useEffect(()=>{
      setCart (getCartProducts() ?? [])
    },[])
    
    
    
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h4>Total</h4>
          <h4>Rs.${count.toFixed(2)}</h4>
        </div>
        <div className="mt-3">
            <Button onClick={()=>setIsModalOpen(true)}  type="primary" className="w-100">
                Checkout
            </Button>
        </div>
      </div>
    );
  };
  return (
    <>
    
      <Drawer title="Add to Cart" closable={false} width={520} onClose={onClose} open={open} footer={<CartFooter />}>
       <div>
      {
        filterData.map((v,i)=>{
          return(
            <div key={i} className="cart__card d-flex border p-3 rounded mb-2 justify-content-between">
              <div className="col-4">
                <img src={v.image} className="w-100" alt="" />
              </div>
              <div className="px-4">
                <h3>{v.title}</h3>
                <h2>Rs.{v.price}</h2>
                <div>Amount: Rs.${Number(v.price)}</div>
              </div>
              <div>
                <button onClick={()=>deleteCart(v)} className='bg-transparent border-0'>X</button>
              </div>
            </div>
          )
        })
      }
       </div>
      <CheckOut isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Drawer>
    </>
  );
};
export default App;