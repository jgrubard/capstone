import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import InjectedLoginForm from './InjectedLoginForm';

const LoginForm = ({ history }) => {

  return (
    <StripeProvider apiKey='pk_test_AhLiCUGnPSZ5IySTH3Givqd0'>
      <Elements>
        <InjectedLoginForm history={ history } url={ location.hash.slice(1) }/>
      </Elements>
    </StripeProvider>
  )
}

export default LoginForm;
