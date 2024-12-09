import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { getCartProducts } from '../../function/localstorage';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { Api__url } from '../../api/config';
import axios from 'axios';
import { updateAmount } from '../../redux/action';
import { total } from '../../function/common';
const CheckOut = ({ isModalOpen, setIsModalOpen }) => {

    const [cart, setCart] = useState(getCartProducts())
    const [apiData,setApiData] = useState([])
    const dispatch = useDispatch()
    

    useEffect(()=>{
        async function getUser() {
          try {
              const response = await axios.get(Api__url);
              setApiData(response.data)
              let totalAmount = total(response.data)
              dispatch(updateAmount(totalAmount))
              const localstorage = getCartProducts()
              setCart(localstorage)
          } catch (error) {
              console.error(error);
          }
        }
        getUser()
      },[cart,isModalOpen,dispatch])

      const filterData = apiData.filter(v => v?.id && cart.includes(v.id))

    const count = useSelector((state) => state.counter)
    const totalGST = count * 15 / 100

    const totalAmountOrder = count + 200 + totalGST
    

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                CheckOut
            </Button>
            <Modal title="confirm Order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div className='d-flex '>
                        <div>
                            <h2 className='fisrtRow'>Items</h2>
                        </div>
                        <div>
                            <h2 className='secondRow'>QTD</h2>
                        </div>
                        <div>
                            <h2>Price</h2>
                        </div>
                    </div>
                    {
                        filterData.map((v, i) => {
                            return (
                                <div className='d-flex '>
                                    <div className='fisrtRow'>
                                        <h4>{v.title}</h4>
                                    </div>
                                    <div className='secondRow'>
                                        <h4>1</h4>
                                    </div>
                                    <div>
                                        <h4>{v.price.toFixed(2)}</h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <hr />
                    <div className='d-flex '>
                        <div className='fisrtRow'>
                            <h4>shipping charges</h4>
                        </div>
                        <div className='secondRow'>
                            <h4>.</h4>
                        </div>
                        <div>
                            <h4>200</h4>
                        </div>
                    </div>
                    <div className='d-flex '>
                        <div className='fisrtRow'>
                            <h4>GST</h4>
                        </div>
                        <div className='secondRow'>
                            <h4>15%</h4>
                        </div>
                        <div>
                            <h4>{totalGST.toFixed(2)}</h4>
                        </div>
                    </div>
                    <hr />
                    <div className='d-flex '>
                        <div className='fisrtRow'>
                            <h4>Total Amount</h4>
                        </div>
                        <div className='secondRow'>
                            <h4>.</h4>
                        </div>
                        <div>
                            <h4>{totalAmountOrder.toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default CheckOut;