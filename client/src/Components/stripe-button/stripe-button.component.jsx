import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton=({price})=>{
    const priceForStripe= price*100;
    const publishableKey='pk_test_G4KTFpxM46HDvpWR5LJapqZv00zmLjWsHI';
    const onToken=token=>{
        axios({
            url:'http://localhost:5000/payment',
            method:'post',
            data: {
                priceForStripe,
                token
            }
        }).then(response=>{
            alert('Payment Successful')
        }).catch(error=>{
            console.log('Payment error: ', error.response);
            alert(' There was an issue with your payment.Please make sure you use the provided credit card');
        })
        
    }
    return(
        <StripeCheckout 
            label='Pay Now' 
            name='Kudos Clothing Ltd.'
            billingAddress 
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;