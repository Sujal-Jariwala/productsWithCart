import React, { useEffect, useState } from 'react';
import { productsData } from '../assets/data';
import cartIcon from '../assets/images/icon-add-to-cart.svg';
import emptyIllustration from '../assets/images/illustration-empty-cart.svg';
import { useCartContext } from '../context/CartContext';
import carbonNuetral from '../assets/images/icon-carbon-neutral.svg'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import {Modal} from 'antd'
import orderConfirm from '../assets/images/icon-order-confirmed.svg'
export default function Products() {
  let [product, setProducts] = useState(productsData);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { cartItems, totalCartItemsCount, totalOrderPrice, addItemToCart, products, handleRemoveCartItem,isProductInCart,incrementQuantity,decrementQuantity, getCartItem,setCartItems} = useCartContext();
  const [hoveredStates, setHoveredStates] = useState({
    hoveredMinus:false,
    hoveredPlus:false,
    hovered:false,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const setItemHover = (itemName, hoverType, isHovered) => {
    setHoveredStates(prev => ({
      ...prev,
      [itemName]: {...(prev[itemName] || {}), [hoverType]: isHovered}
    }));
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <>
      <div className={`flex max-md:flex max-md:flex-col items-start justify-center bg-[#F4EDEB] w-full min-h-screen p-7 max-md:p-0 max-md:items-center max-md:px-5 ${windowWidth >= 768 && windowWidth <= 1245 ? 'flex flex-col items-center justify-center px-1 ' : ''}`}>
        <div className='flex flex-col max-md:justify-center max-md:items-center '>
          <h1 className='font-bold text-[#260F08] text-3xl mt-5'>Desserts</h1>
          <div className={`flex flex-wrap max-w-4xl gap-x-5 gap-y-7 mt-5 max-md:justify-center max-md:items-center max-md:flex max-md:flex-col `}>
            {product && product.map((product, index) => (
              <div key={index} className='flex flex-col '>
                <div className='flex flex-col items-center justify-center group'>
                  <img
                    src={windowWidth < 768 ? product.image.mobile : product.image.desktop}
                    alt={product.name}
                    className={` rounded-lg ${windowWidth < 768 ? 'object-fill border-2 group-focus-within:border-[#C73A0F]' : 'max-w-60'}`}
                  />
                  {isProductInCart(product.name)?(
                    <>
                    <button className='flex justify-around items-center border bg-[#C73A0F] rounded-3xl -mt-4 py-2.5 group hover:shadow-xl ease-in-out transition duration-300 group border-[#C73A0F] w-32 '>
                    <AiOutlineMinusCircle 
                      style={{
                        color: hoveredStates[product.name]?.hoveredMinus ? '#C73A0F' : 'white',
                        backgroundColor: hoveredStates[product.name]?.hoveredMinus ? 'white' : '',
                        borderRadius: '22px',
                        width: '22px',
                        height: '22px',
                        border: '0px'
                      }}
                      onMouseEnter={() => setItemHover(product.name, 'hoveredMinus', true)}
                      onMouseLeave={() => setItemHover(product.name, 'hoveredMinus', false)}
                      onClick={() => decrementQuantity(product.name)}
                    />
                    <span className='text-white'>{getCartItem(product.name).quantity}</span>
                    <AiOutlinePlusCircle  
                      style={{
                        color: hoveredStates[product.name]?.hoveredPlus ? '#C73A0F' : 'white',
                        backgroundColor: hoveredStates[product.name]?.hoveredPlus ? 'white' : '#C73A0F',
                        borderRadius: '22px',
                        width: '22px',
                        height: '22px',
                        border: '0px'
                      }}
                      onMouseEnter={() => setItemHover(product.name, 'hoveredPlus', true)}
                      onMouseLeave={() => setItemHover(product.name, 'hoveredPlus', false)}
                      onClick={() => incrementQuantity(product.name)}
                    />
                    
                    </button>
                    </>
                  ):(
                    <>
                      <button
                    onClick={() => addItemToCart(product)} // Pass the product to addItemToCart
                    className={`flex justify-center items-center border bg-white rounded-3xl -mt-4 py-1.5 px-3 hover:shadow-xl ease-in-out transition duration-300 group border-[#C73A0F]`}>
                    <img
                      src={cartIcon}
                      className='w-4 mr-2'
                    />
                    <span className='text-[#260F08] text-md font-redHat font-semibold group-hover:text-[#C73A0F]'>Add to Cart</span>
                  </button>
                    </>
                  )}
                  
                </div>
                <div className='flex flex-col'>
                  <span className='text-[#C9AEA6] text-sm font-redHat'>{product.category}</span>
                  <span className='text-[#260F08] text-lg font-redHat font-semibold'>{product.name}</span>
                  <span className='text-[#C73A0F] text-lg'>₹{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`bg-white rounded-lg px-5 flex flex-col py-1 mt-5 max-md:w-full ${windowWidth >= 768 && windowWidth <= 1245 ? 'w-full ' : ''}`}>
          <div className='flex'>
            <span className='text-[#C73A0F] font-bold text-lg px-1 py-2'>Your Cart ({totalCartItemsCount})</span>
          </div>
          {!totalCartItemsCount ? (
            <div className='flex flex-col justify-center items-center py-5 px-5'>
              <img src={emptyIllustration} className='w-32' />
              <span className='text-[#AD8985] font-redHat font-semibold'>Items added will appear here</span>
            </div>
          ) : (
            // Optionally you can add the list of cart items here
            <div className='flex flex-col  py-5'>
              {/* Render cart items here */}
              {cartItems.map((item,index)=>(
                <>
                <div key={index} className='flex items-center'>
                  <span className='text-sm font-redHat font-semibold '>{item.name}</span>
                    
                </div>  
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <span className='text-[#C73A0F]'>{item.quantity}x</span>
                    <span className='text-xs ml-2 font-redHat font-semibold text-[#C9AEA6]'>@₹{item.price}</span>
                    <span className='text-[#87635A] ml-2 font-redHat font-bold text-xs'>{item.price}</span>
                    <div className='flex justify-between'>
                    </div>
                  </div>
                  <div className='flex items-center '>
                  <MdOutlineCancel 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: hoveredStates[item.name]?.hovered ? '#260F08' : '#87635A',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setItemHover(item.name, 'hovered', true)}
                  onMouseLeave={() => setItemHover(item.name, 'hovered', false)}
                  onClick={() => handleRemoveCartItem(item.name)}
                  />
                  </div>
                </div>
                
                
                <hr className='mt-5 mb-5'/>
                </>
                
              ))}
              <div className='flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                <span className='text-md text-[#260F08] font-redHat font-normal'>Order Total</span>
                <span className='text-[#260F08] font-bold font-redHat text-xl'>₹{Number(totalOrderPrice).toFixed(2)}</span>
                </div>
              
              <div className='flex bg-[#F4EDEB] rounded-xl px-6 py-2 mt-3 mb-5'>
                <img src={carbonNuetral} className='mr-2' />
                <span className='text-[#87635A]'>This is a <span className='font-bold text-[#260F08]'>carbon-neutral</span> delivery</span>
              </div>
              <button 
                onClick={()=>setIsModalOpen(true)}
              className='border border-[#C73A0F] px-6 py-2 bg-[#C73A0F] text-white rounded-3xl font-redHat font-normal hover:bg-red-900 ease-in-out transition duration-300'>Confirm Order</button>
              </div>
            </div>
          )}
        </div>
        <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null} styles={{
          content:{
            height:'100%',
            width:'100%'
          }
        }}>
          <img src={orderConfirm} />
          <div className='flex flex-col '>
            <h1 className='mt-3 font-redHat font-bold text-3xl text-[#260F08]'>Order Confirmed</h1>
            <span className='text-[#AD8985] mt-2 mb-5'>We hope you enjoy your food</span>
              <div className='bg-[#F4EDEB] flex flex-col gap-y-5 max-sm:p-4 p-5 rounded-lg'>
            {cartItems.map((item,index)=>(
              <>
              
              <div key={index} className='flex items-center '>
                  <div className='flex-shrink-0'>
                    <img src={item.thumbnail} className='w-14 rounded-xl max-md:w-10' />
                  </div>
                  <div className='flex flex-col flex-grow ml-3 max-md:ml-2 '>
                    <div className='flex items-center'>
                      <span className='font-redHat text-[#260F08] font-semibold'>{item.name}</span>
                    </div>
                    <div className='flex items-center justify-between '>
                      <div className='flex items-center'>
                        <span className='font-redHat font-semibold text-[#C73A0F]'>{item.quantity}x</span>
                        <span className='ml-5 max-md:ml-2 text-xs font-redHat font-semibold text-[#AD8985]'>@₹{item.price}</span>
                      </div>
                      <div className='flex items-center'>
                        <span className='font-redHat max-md:text-sm font-semibold text-[#260F08] text-base'>₹{Number(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
            <div className='flex items-center justify-between'>
            <span className='text-base font-redHat font-semibold'>Order Total</span>
            <span className='text-2xl text-[#260F08] font-redHat font-bold max-md:text-xl'>₹{Number(totalOrderPrice).toFixed(2)}</span>
            </div>
            </div>
            <div className='flex justify-center items-center mt-7 '>
          <button 
          onClick={()=>{
            setCartItems([])
            setIsModalOpen(false)
          }}
          className='text-white bg-[#C73A0F] border-2 font-redHat  text-sm border-[#C73A0F] py-2.5 px-5 rounded-3xl w-full'>Start New Order</button>
          </div>
          </div>
          
          
        </Modal>
      </div>
    </>
  );
}
