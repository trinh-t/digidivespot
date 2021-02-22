import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar";
import Location from "../components/Location";

export default function MyFavDiveLocations(props) {
  const { locations, setLocation, setLoginScreen, myData } = props;
  const { loggedIn } = useContext(UserContext);
  const [myFavDivespots, setMyFavDivespots] = useState([]);

  if (!loggedIn) window.location = "/";

  useEffect(() => {
    if (locations)
      setMyFavDivespots(
        locations.filter(function (location) {
          return myData.favorites.indexOf(location.id) > -1;
        })
      );
  }, [locations]);

  return (
    <OuterContainer>
      <Sidebar
        setLoginScreen={setLoginScreen}
        myData={myData}
        loggedIn={loggedIn}
      />
      <MainSection>
        <Heading>Mijn Duiklocaties</Heading>
        {myFavDivespots.map((location) => (
          <Link
            to="/locationdetails"
            key={location.id}
            onClick={() => setLocation(location.id)}
          >
            <Location data={location} />
          </Link>
        ))}
      </MainSection>
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  padding-left: 393px;
  margin-bottom: 88px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

const Heading = styled.h1`
  text-align: center;
  font: normal normal normal 57px/61px "Big Shoulders Display";
  margin-bottom: 88px;
`;
