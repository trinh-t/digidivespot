import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import GlobalStyles from "./components/GlobalStyles";
import { UserContext } from "./context/UserContext";
import { getUserData } from "./actions/user.action";

const Home = lazy(() => import("./pages/Home"));
const FindDiveLocation = lazy(() => import("./pages/FindDiveLocation"));
const LocationDetails = lazy(() => import("./pages/LocationDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const MyFavDiveLocations = lazy(() => import("./pages/MyFavDiveLocations"));
const SpotstByProvince = lazy(() => import("./pages/SpotsByProvince"));

export default function App() {
  const { loggedIn, user } = useContext(UserContext);
  const [locationId, setLocation] = useState(0);
  const [loginScreen, setLoginScreen] = useState(false);
  const [divesites, setDivesites] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);
      try {
        const result = await axios.get(
          "https://digidivespot-default-rtdb.europe-west1.firebasedatabase.app/.json"
        );
        setDivesites(result.data.divespots);
        toggleLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) setMyData(getUserData(user));
  }, [user]);

  const getLocationById = () => {
    for (let i = 0; i < divesites.length; i++) {
      if (divesites[i].id === locationId) return divesites[i];
    }
  };
  return (
    <>
      <GlobalStyles />
      <Suspense
        fallback={<div className="loading">Pagina wordt geladen...</div>}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home loginScreen={loginScreen} setLoginScreen={setLoginScreen} />
            )}
          />
          <Route
            exact
            path="/alle-locaties"
            render={() => (
              <FindDiveLocation
                locations={divesites}
                setLocation={setLocation}
                setLoginScreen={setLoginScreen}
                myData={myData}
              />
            )}
          />
          <Route
            exact
            path="/locationdetails"
            render={() => (
              <LocationDetails
                setLoginScreen={setLoginScreen}
                myData={myData}
                location={getLocationById()}
              />
            )}
          />
          <Route
            path="/province/:name"
            render={(props) => (
              <SpotstByProvince
                locations={divesites}
                setLocation={setLocation}
                setLoginScreen={setLoginScreen}
                myData={myData}
                {...props}
              />
            )}
          />
          (
          <Route
            path="/mijn-locaties"
            render={() => (
              <MyFavDiveLocations
                locations={divesites}
                setLocation={setLocation}
                setLoginScreen={setLoginScreen}
                myData={myData}
              />
            )}
          />
          {loggedIn && (
            <Route
              exact
              path="/profiel"
              render={() => (
                <Profile myData={myData} setLoginScreen={setLoginScreen} />
              )}
            />
          )}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
