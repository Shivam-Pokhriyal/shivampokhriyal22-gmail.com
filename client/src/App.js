import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Header from './Components/header/header.component'
import Spinner from './Components/spinner/spinner.component'
import ErrorBoundary from './Components/error-boundary/error-boundary.component'
import { GlobalStyle } from './global.styles'

import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.action'


const HomePage = lazy(() => import('./Pages/HomePage/homepage.component'));
const ShopPage = lazy(() => import('./Pages/Shop/shop.component'));
const SignINAndSignUpPage = lazy(() => import('./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./Pages/Checkout/checkout.component'))

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin'
              render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignINAndSignUpPage />
                  )
              } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
