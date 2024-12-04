import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { getCartProducts } from '../../function/localstorage';
import Bestsell from '../../componet/bestsell/data';
import './style.css'
const CheckOut = ({ isModalOpen, setIsModalOpen }) => {

    const [cart, setCart] = useState(getCartProducts())
    const filterData = Bestsell.filter(v => v?.id && cart.includes(v.id))

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
                                        <h4>3</h4>
                                    </div>
                                    <div>
                                        <h4>{v.price}</h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
        </>
    );
};
export default CheckOut;