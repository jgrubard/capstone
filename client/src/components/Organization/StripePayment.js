// import React from 'react';
// import axios from 'axios';
// import StripeCheckout from 'react-stripe-checkout';

// const onToken = (email) => {
//   return (token) => {
//     axios.post('/api/stripe', {
//       source: token.id,
//       amount: 100 * 100,
//       currenct: 'USD',
//       receipt_email: email,
//       description: 'Organization Sign-Up'
//     })
//     .then(res => res.data)
//   }
// }

// const stripePayment = ({ name, email }) => {
//   return (
//     <StripeCheckout
//       name={name}
//       stripeKey='stripe_publishable_key'
//       token={onToken(email)}
//       amount={100 * 100}
//       email={email}
//     />
//   );
// }

// export default StripePayment;
