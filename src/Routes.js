import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { WithLayoutRoute } from "./routers";
import { PublicLayout, SecondaryPublicLayout } from "./layouts";

// const LandingPage = lazy(() => import("./pages/LandingPage"));

import Home from "./pages/Home";
import AddOffers from "./pages/AddOffers";
import ViewOffers from "./pages/ViewOffers";
import AddAnnouncemnts from "./pages/AddAnnouncemnts";
import ViewAnnouncements from "./pages/ViewAnnouncements";
import ViewTips from "./pages/ViewTips";
import AddTips from "./pages/AddTips";
import AddNotification from "./pages/AddNotification";
import ViewNotification from "./pages/ViewNotification";
import UserProfile from "./pages/UserProfile";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <WithLayoutRoute
          exact
          path="/"
          layout={PublicLayout}
          component={Home}
        />
        <WithLayoutRoute
          exact
          path="/signup"
          layout={SecondaryPublicLayout}
          component={Signup}
        />
        <WithLayoutRoute
          exact
          path="/Login"
          layout={SecondaryPublicLayout}
          component={Login}
        />
        <WithLayoutRoute
          exact
          path="/add-offers"
          layout={PublicLayout}
          component={AddOffers}
        />
        <WithLayoutRoute
          exact
          path="/view-offers"
          layout={PublicLayout}
          component={ViewOffers}
        />
        <WithLayoutRoute
          exact
          path="/add-announcements"
          layout={PublicLayout}
          component={AddAnnouncemnts}
        />
        <WithLayoutRoute
          exact
          path="/view-announcements"
          layout={PublicLayout}
          component={ViewAnnouncements}
        />
        <WithLayoutRoute
          exact
          path="/add-tips"
          layout={PublicLayout}
          component={AddTips}
        />
        <WithLayoutRoute
          exact
          path="/view-tips"
          layout={PublicLayout}
          component={ViewTips}
        />
        <WithLayoutRoute
          exact
          path="/add-notification"
          layout={PublicLayout}
          component={AddNotification}
        />
        <WithLayoutRoute
          exact
          path="/view-notification"
          layout={PublicLayout}
          component={ViewNotification}
        />
        <WithLayoutRoute
          exact
          path="/user-profile/:id"
          layout={PublicLayout}
          component={UserProfile}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
};

export default Routes;
