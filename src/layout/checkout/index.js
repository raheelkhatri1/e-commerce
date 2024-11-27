import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { getCartProducts } from '../../function/localstorage';
import Bestsell from '../../componet/bestsell/data';
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
                Open Modal
            </Button>
            <Modal title="confirm Order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div className='d-flex justify-content-between'>

                        <div>
                            <h2>Items</h2>
                        </div>
                        <div>
                            <h2>QTD</h2>
                        </div>
                        <div>
                            <h2>Price</h2>
                        </div>
                    </div>
                    {
                        filterData.map((v, i) => {
                            return (
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h4>{v.title}</h4>
                                    </div>
                                    <div>
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