import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Student from './pages/Student/Student';
import Educator from './pages/Educator/Educator';
import InstituteAdmin from './pages/InstituteAdmin/InstituteAdmin';
import { auth, firestore } from './firebase';
import ParticularCourse from './Components/ParticularCourse';
import AddEducator from './pages/InstituteAdmin/AddEducator';
import AddCourse from './pages/Educator/AddCourse';
import RecentNotes from './pages/RecentNotes';
import RecentStreams from './pages/RecentStreams';
import TimeTable from './pages/TimeTable';
import OverallAttendence from './pages/OverallAttendence';
import FreshmanYearEducator from './pages/Educator/TimeTablesEducator/FreshmanYearEducator';
import SophomoreYearEducator from './pages/Educator/TimeTablesEducator/SophomoreYearEducator';
import PreFinalYearEducator from './pages/Educator/TimeTablesEducator/PreFinalYearEducator';
import FinalYearEducator from './pages/Educator/TimeTablesEducator/FinalYearEducator';
import { createUserProfileDocument } from './services/utils';

const initialState = {
  ready: false,
  access: null,
  user: null,
  userData: null,
};

function withProps(Component, props) {
  return function(matchProps) {
    return <Component {...props} {...matchProps} />
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetState = (callback) => {
    this.setState(
      {
        ready: true,
        access: '',
        user: null,
        userData: null,
      },
      callback,
    );
  };


  render() {
    const { user, access, ready } = this.state;

    if (ready) {
      return (
        <SnackbarProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={withProps(Login, { user: user, access:access })}/>
              <Route exact path="/educator/freshmanyeartimetable" component={withProps(FreshmanYearEducator, { user: user, access:access })}/>
              <Route exact path="/educator/sophomoreyeartimetable" component={withProps(SophomoreYearEducator, { user: user, access:access })}/>
              <Route exact path="/educator/prefinalyeartimetable" component={withProps(PreFinalYearEducator, { user: user, access:access })}/>
              <Route exact path="/educator/finalyeartimetable" component={withProps(FinalYearEducator, { user: user, access:access })}/>
              <Route exact path="/student" component={withProps(Student, { user: user, access:access })} />
              <Route exact path="/educator" component={withProps(Educator, { user: user, access:access })} />
              <Route exact path="/educator/addcourse" component={withProps(AddCourse, { user: user, access:access })} />
              <Route exact path="/student/courseId" component={withProps(ParticularCourse, { user: user, access:access })} />
              <Route exact path="/student/recent_notes" component={withProps(RecentNotes, { user: user, access:access })} />
              <Route exact path="/student/recent_streams" component={withProps(RecentStreams, { user: user, access:access })} />
              <Route exact path="/student/time_table" component={withProps(TimeTable, { user: user, access:access })} />
              <Route exact path="/student/attendence" component={withProps(OverallAttendence, { user: user, access:access })} />
              <Route exact path="/instituteadmin/addeducator" component={withProps(AddEducator, { user: user, access:access })} />
              <Route exact path="/instituteadmin" component={withProps(InstituteAdmin, { user: user, access:access })} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </SnackbarProvider>
      );
    }
    else return ( "Loading")
  }

  componentDidMount() {
    this.onAuthStateChangedObserver = auth.onAuthStateChanged(
      (user) => {
        if (!user || !user.uid) {
          if (this.userDocumentSnapshotListener) {
            this.userDocumentSnapshotListener();
          }
          this.resetState();
          return;
        }

        this.userDocumentSnapshotListener = firestore
          .collection('users')
          .doc(user.uid)
          .onSnapshot(
            async (snapshot) => {

              let userData;
              if (!snapshot.exists) {
                const newUser = await createUserProfileDocument(user.uid, "student")

                const getData = await newUser.get()
                userData = getData.data();

              }
              else
                userData = snapshot.data();

              if (!userData) {
                if (this.userDocumentSnapshotListener) {
                  this.userDocumentSnapshotListener();
                }
                this.resetState();
                return;
               }


              // if (!snapshot.exists || !data) {
              //   if (this.userDocumentSnapshotListener) {
              //     this.userDocumentSnapshotListener();
              //   }
              //   this.resetState();
              //   return;
              // }

              this.setState({
                ready: true,
                user: user,
                userData: userData,
                access: userData.role,
              });

              console.log(this.state)

            },
            (error) => {
              this.resetState();
              return;
            },
          );
      },
      (error) => {
        this.resetState();
        return;
      },
    );
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }
    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }
  }
}

export default App;
