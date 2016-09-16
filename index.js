import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import App from './modules/App'
import Login from './modules/Login'
import Register from './modules/Register'
import FindPsw from './modules/FindPsw'
import ProjectList from './modules/adminModules/ProjectList'
import GroupList from './modules/adminModules/GroupList'
import UserList from './modules/adminModules/UserList'
import MainPage from './modules/adminModules/MainPage'
import Group from './modules/adminModules/GroupInfo'
import ProjectInfo from './modules/adminModules/ProjectInfo'
import SingleProInfo from './modules/adminModules/SingleProInfo'
import SingleMember from './modules/App/SingleMember'
import AllMembers from './modules/App/AllMembers'
import BarChart from './modules/App/charts/BarChart'
import AreaChart from './modules/App/charts/AreaChart'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render((
  <Router history={hashHistory}>
      <Route path="/" component={Login} />
      <Route path="/myProject" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/mainpage" component={MainPage} />
      <Route path="/projectlist" component={ProjectList} />
      <Route path="/grouplist" component={GroupList} />
      <Route path="/userlist" component={UserList} />
      <Route path="/group" component={Group} />
      <Route path="/singleproinfo" component={SingleProInfo} />
      <Route path="/findPsw" component={FindPsw} />
      <Route path="/login" component={Login} />
      <Redirect from="/app" to="/allLastSevenDays" />
      <Route path="/projectinfo" component={ProjectInfo}>
          <Route path="/single" component={SingleMember}> </Route>
          <Route path="/lastSevenDays" component={AreaChart}/>
          <Route path="/lastFifteenDays" component={AreaChart}/>
          <Route path="/lastMonth" component={AreaChart}/>
          <Route path="/lastTwoMonths" component={AreaChart}/>
          <Route path="/lastFourMonths" component={AreaChart}/>
          <Route path="/lastSixMonths" component={AreaChart}/>
      </Route>
      <Route path="/app" component={App}>
          <Route path="/all" component={AllMembers}> </Route>
              <Route path="/allLastSevenDays" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/allLastFifteenDays" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/allLastMonth" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/allLastTwoMonths" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/allLastFourMonths" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/allLastSixMonths" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/barchart" component={{barchart:BarChart,areachart:AreaChart}}/>
              <Route path="/areachart" component={{barchart:BarChart,areachart:AreaChart}}/>
      </Route>
  </Router>
    
), document.getElementById('app'));


