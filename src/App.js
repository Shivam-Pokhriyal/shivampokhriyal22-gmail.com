import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import './App.css';

import CheckoutPage from './Pages/Checkout/checkout.component'
import HomePage from './Pages/HomePage/homepage.component'
import ShopPage from './Pages/Shop/shop.component'

import Header from './Components/header/header.component'
import {selectCurrentUser} from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.action'
import SignINAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component'


class App extends React.Component {

  unsubscribeFromAuth=null;

  componentDidMount(){
    const {checkUserSession}= this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render()
  {  return (
    <div>
      <Header/>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/shop' component={ShopPage}/>
      <Route exact path='/checkout' component={CheckoutPage}/>
      <Route exact path='/signin' 
        render={()=>
        this.props.currentUser ? (
        <Redirect to='/'/>
        ):(
        <SignINAndSignUpPage/>
        )
      }/>
      </Switch>
    </div>
    );
  }
}

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps= dispatch=>({
  checkUserSession: ()=>dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
