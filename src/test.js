import React, { useContext } from 'react'
import { CartContext } from '../context/cartContext';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import PageHeading from '../Components/PageHeading';
import { styled } from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import FormatPrice from '../Helper/FormatPrice';
import { useAuth0 } from '@auth0/auth0-react';


const Cart = () => {

  const { removeItem, cart, clearcart, total_amount } = useContext(CartContext);
  const { isAuthenticated, user } = useAuth0();

  return (
    <Wrapper>
      <div className="contactTitle" >
        <PageHeading name="Cart Items" />
        <AiOutlineShoppingCart />
      </div>
      {isAuthenticated ? (<div style={{ width: "100%", padding: "2rem", display: "flex", gap: "1rem" }}>
        <img src={user.picture} alt={user.name} />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>) : null}


      <div className='container'>
        <div>
          <table>
            <tr>
              <th className='th_css'>Product</th>
              <th className='th_css'>Quantity</th>
              <th className='th_css'>Color</th>
              <th className='th_css'>Price</th>
              <th className='th_css'>Subtotal</th>
            </tr>
            {cart.map((cur, index) => {
              return (
                <tr key={index}>
                  <td className='th_css'>{cur.name}</td>
                  <td className='th_css'>{cur.value}</td>
                  <td style={{ display: "flex", justifyContent: "center" }} className='th_css'><p className='boughtColor' style={{ backgroundColor: cur.color }}></p></td>
                  <td className='th_css'><FormatPrice price={cur.price} /></td>
                  <td className='th_css'><FormatPrice price={cur.price * cur.value} /></td>
                  <td className='th_css remove'><AiFillDelete style={{ color: "red" }} onClick={() => removeItem(cur.id)} /></td>
                </tr>
              )
            })}

          </table>
        </div>
        <div>
          <table className='total'>
            <tr className='totaltr'>
              <td className='totaltdleft th_css'>Cart Value  :</td>
              <td className='totaltdright th_css'><FormatPrice price={total_amount} /></td>
            </tr>
            <tr className='totaltr'>
              <td className='totaltdleft th_css'>Charges and Taxes  :</td>
              <td className='totaltdright th_css'><FormatPrice price={500} /></td>
            </tr>
            <hr />
            <tr className='totaltr'>
              <td className='totaltdleft th_css'>To pay :</td>
              <td className='totaltdright th_css'><FormatPrice price={total_amount + 500} /></td>
            </tr>
          </table>
          <button className="button">Pay and Place Order</button>
        </div>
      </div>
      <div className='buttons'>
        <NavLink to='/products'><button className="continueshopping">Continue Shopping</button></NavLink>
        <button className="clearcart" onClick={clearcart}>Clear Cart</button>

      </div>



    </Wrapper>
  )
}


export default Cart;