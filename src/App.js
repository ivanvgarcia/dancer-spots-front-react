import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './mystyles.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
// import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navigation from './components/layout/Navigation';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Profile from './components/profile/Profile';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-experience/AddExperience';
import AddEvent from './components/events/AddEvent';
import EditEvent from './components/events/EditEvent';
import AddVenue from './components/venues/AddVenue';
import EditVenue from './components/venues/EditVenue';
import NotFound from './components/notfound/NotFound';
import EditUserData from './components/edit-profile/EditUserData';
import ForgotPassword from './components/common/ForgotPassword';
import ResetPassword from './components/common/ResetPassword';
import ScrollToTop from './components/common/ScrollToTop';
import Loader from './components/common/Loader';

const ShowVenue = lazy(() => import('./components/venues/ShowVenue'));
const ShowEvent = lazy(() => import('./components/events/ShowEvent'));
const AllProfiles = lazy(() => import('./components/allprofiles/AllProfiles'));
const AllEvents = lazy(() => import('./components/events/AllEvents.js'));
const AllVenues = lazy(() => import('./components/venues/AllVenues'));
const AllLessons = lazy(() => import('./components/lessons/AllLessons'));
const AddLesson = lazy(() => import('./components/lessons/AddLesson'));
const EditLesson = lazy(() => import('./components/lessons/EditLesson'));
const ShowLesson = lazy(() => import('./components/lessons/ShowLesson'));

class App extends Component {
  componentDidMount() {
    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and expiration
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // // Check for expired token
      // const currentTime = Date.now() / 500;

      // if (decoded.exp < currentTime) {
      //   store.dispatch(logoutUser());
      //   // Clear current profile
      //   store.dispatch(clearCurrentProfile());
      //   // Redirect to login
      // }
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Navigation />
              <div className="main">
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <AllProfiles exact path="/profiles/all" />
                    <AllVenues exact path="/venues/all" />
                    <AllEvents exact path="/events/all" />
                    <AllLessons exact path="/lessons/all" />
                    <AddLesson exact path="/lesson/add" />
                    <EditLesson exact path="/lesson/edit/:id" />
                    <ShowLesson exact path="/lesson/:id" />
                    <PrivateRoute exact path="/myprofile" component={Profile} />
                    <PrivateRoute
                      exact
                      path="/create-my-profile"
                      component={CreateProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/edit-my-profile"
                      component={EditProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/add-my-danceexperience"
                      component={AddExperience}
                    />
                    <PrivateRoute
                      exact
                      path="/event/add-event"
                      component={AddEvent}
                    />
                    <PrivateRoute
                      exact
                      path="/event/edit-event/:id"
                      component={EditEvent}
                    />
                    <PrivateRoute
                      exact
                      path="/venue/add-venue"
                      component={AddVenue}
                    />
                    <PrivateRoute
                      exact
                      path="/venue/edit-venue/:id"
                      component={EditVenue}
                    />
                    <ShowVenue exact path="/venue/:id" />
                    <ShowEvent exact path="/event/:id" />
                    <Route
                      exact
                      path="/profile/user/:username"
                      component={Profile}
                    />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route
                      exact
                      path="/profile/edit/:id"
                      component={EditUserData}
                    />
                    <Route
                      exact
                      path="/forgotpassword"
                      component={ForgotPassword}
                    />{' '}
                    <Route
                      exact
                      path="/resetpassword/:token"
                      component={ResetPassword}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </div>
              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
