import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setCurrentUser} from './redux/user/user.action'
import './App.css';

import CheckoutPage from './Pages/Checkout/checkout.component'
import HomePage from './Pages/HomePage/homepage.component'
import ShopPage from './Pages/Shop/shop.component'

import Header from './Components/header/header.component'
import {selectCurrentUser} from './redux/user/user.selectors'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
import SignINAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component'


class App extends React.Component {

  unsubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });

      }
      else{
        setCurrentUser(userAuth);
      }
    });
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

const mapDispatchToProps=dispatch=>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
