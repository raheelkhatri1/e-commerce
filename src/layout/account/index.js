import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import "./style.css"


const Account = ({ open, setOpen }) => {


    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <div>

                    <Input size="large" placeholder="First Name" />

                    <Input size="large" className='mt-2' placeholder="Last Name" />

                    <Input size="large" className='mt-2' type='gmail' placeholder="Gmail" prefix={<UserOutlined />} />


                    <Input.Password
                        size='large'
                        className='mt-2'
                        placeholder="input password"
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible,
                        }}
                    />

                    <button type="button" class="btn btn-dark btnCart mt-2">Login</button>

                </div>
            </Drawer>
        </>
    );
};

export default Account;