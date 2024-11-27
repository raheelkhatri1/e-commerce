import React, { useEffect, useState } from 'react';
import { Button, Drawer, message } from 'antd';
import BestSell from "../bestsell/data"
import {addProductToCart, getCartProducts} from "../../function/localstorage"
import CheckOut from '../../layout/checkout';
const App = ({open,setOpen}) => {
  const [deleteProdut,setDeleteProduct] = useState(getCartProducts())
  function deleteCart(data) {
    let getCart = getCartProducts()
    if(getCart.find(v => v === data.id)){
      const filterData = getCart.filter(v => Number(v) !== Number(data.id))
      addProductToCart(filterData)
      setDeleteProduct(filterData)
      message.success("Product removed from Cart")
    }
    
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart,setCart] = useState(getCartProducts())
  
  const filterData = BestSell.filter(v => v?.id && cart.includes(v.id)) 
  
  
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  const CartFooter = () => {
    
    const productsWithAmount = filterData.map(v => {
      return {
        ...v,
        amount:Number(v.price)
      }
    })
    const total = productsWithAmount.reduce((amount, current)=>{
      return amount+Number(current.amount)     
    },0);
    
    useEffect(()=>{
      setCart (getCartProducts() ?? [])
    },open)
    
    useEffect(()=>{
      setCart (getCartProducts() ?? [])
    },onClose)
    
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h4>Total</h4>
          <h4>Rs.${total}</h4>
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
                <div>Amount: Rs.${Number(v.price) * 2}</div>
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