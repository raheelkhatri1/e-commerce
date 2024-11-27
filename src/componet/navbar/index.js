
import 'bootstrap/dist/css/bootstrap.min.css'
import { MegaMenu } from 'primereact/megamenu';
import './style.css'
import Logo from './../../image/Habiba.png'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { UserOutlined } from '@ant-design/icons';
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import AppDrawer from '../driver';
import App from '../driver';
import Bestsell from '../bestsell/data';
import { getCartProducts } from '../../function/localstorage';
import Account from '../../layout/account';




function Navbar() {
    const[cart,setCart] = useState(getCartProducts())
    const filterData = Bestsell.filter(v => v?.id && cart.includes(v.id))

    
    const [open,setOpen] = useState(false)
    const [accountOpen,setAccountOpen] = useState(false)
    
    const productsWithAmount = filterData.map(v =>{
        return{
            ...v,
            amount:Number(v.price),
        }
    })
    
    const total = productsWithAmount.reduce((amount,current)=>{
        return amount+Number(current.amount)
    },0);
    

    const items = [
        {
            label: 'Furniture',
            icon: 'pi pi-box',
            items: [
                [
                    {
                        label: 'Living Room',
                        items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                    }
                ],
                [
                    {
                        label: 'Kitchen',
                        items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                    },
                    {
                        label: 'Bathroom',
                        items: [{ label: 'Accessories' }]
                    }
                ],
                [
                    {
                        label: 'Bedroom',
                        items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                    }
                ],
                [
                    {
                        label: 'Office',
                        items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                    }
                ]
            ]
        },
        {
            label: 'Electronics',
            icon: 'pi pi-mobile',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                    }
                ],
                [
                    {
                        label: 'Home Theather',
                        items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                    }
                ],
                [
                    {
                        label: 'Gaming',
                        items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                    }
                ],
                [
                    {
                        label: 'Appliances',
                        items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                    }
                ]
            ]
        },
        {
            label: 'Sports',
            icon: 'pi pi-clock',
            items: [
                [
                    {
                        label: 'Football',
                        items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                    }
                ],
                [
                    {
                        label: 'Running',
                        items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                    }
                ],
                [
                    {
                        label: 'Swimming',
                        items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                    }
                ],
                [
                    {
                        label: 'Tennis',
                        items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                    }
                ]
            ]
        }
    ];

    

    return (
        <>

        <div >
            
            <div className="nav-bar">
                <img className="logo" src={Logo} />
                <div className='inputContinar'>
                    <button className='buttonSearch'><IoSearchOutline size={20} /></button>
                    <input className='input' placeholder='search for...' type='text' />
                    <button className='btnAccount' onClick={()=>setAccountOpen(true)}><UserOutlined  className='btnCartLogo' /> Account</button>
                    <button type="button" onClick={()=>setOpen(true)}  class="btn btn-dark btnCart"><IoCartOutline size={20} className='btnCartLogo' />RS:{total}</button>
                    
                </div>
            </div>
            <div className='megamenucontinar'>
                <MegaMenu className='megamenu' model={items} breakpoint="960px" />

            </div>
            
        </div>
            <Account open={accountOpen} setOpen={setAccountOpen} />
        <App open={open} setOpen={setOpen} />
        
        
        </>
    )
}
export default Navbar;