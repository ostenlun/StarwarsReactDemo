import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components';

/**
 * This web page displays Starwars starship statistics by calling the https://swapi.dev/ API. 
 * Each starship's name, model, crew and number of films are shown on the page. The starships 
 * are sorted in order of crew and any starship with crew over 10 is removed.
 * The Films Trophy is rewarded for starships that have most film appearances.
 * This is a React application that calls the web API with Axios library. The styling of
 * the page is done by using Styled Components.
 */

const Title = styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: #0094C6;
  font-family: Orbitron, Calibri;
`;

const IntroText = styled.div`
   margin: 10px 10px 40px 10px;
`;

const Page = styled.div`
   height: 100%;
   color: white;
   margin: 50px auto;
   max-width: 800px;
   width: 90%;
   font-family: Consolas, Helvetica, Calibri;
   link-color: #0094C6;
   
   a:link {
      color: #0094C6;
      text-decoration: none;
   }

   a:hover {
      color: #005E7C;
   }

   a:visited {
      color: #0094C6;
   }
`;

const TableContainer = styled.div`
   overflow-x:auto;
`;

const Table = styled.table`
   border: 2px solid #005E7C;
   border-collapse: collapse;
   margin-top: 20px;
   background-color: black;
   color: white;
   font-family: Orbitron, Calibri;
`;

const THead = styled.thead`
`;

const TBody = styled.tbody`
`;

const TR = styled.tr`   
   background-color: #f8f8f8;
   border: 1px solid #0094C6;
   padding: .35em;
`;

const TH = styled.th`
   padding: .625em;
   text-align: left;
   font-size: .85em;
   letter-spacing: .1em;
   text-transform: uppercase;
   background-color: #005E7C; /*CE84AD*/
   border: 2px solid #0094C6;
`;

const TD = styled.td`
   padding: .625em;
   border: 2px solid #0094C6;
   text-align: left;
   background-color: black;
   font-size: .85em;
`;

const TDImage = styled(TD)`
   max-width: 40px;
   padding: .125em;
   text-align: center;
`;

const TDName = styled(TD)`
   min-width: 180px;
`;

const TDModel = styled(TD)`
   min-width: 180px;
`;

const TDCrew = styled(TD)`
   text-align: center;
   width: 60px;
`;

const TDFilms = styled(TD)`
   width: 60px;
   text-align: center;
`;

const TDFilmsTrophy = styled(TD)`
   width: 50px;
   text-align: center;
`;

const App = () => {
   const [starships, setStarships] = useState(null);
   var returnArray = [];

   function getStarshipData(page){
      return axios.get(`https://swapi.dev/api/starships/?page=${page}`)
                  .then(function(response) {
                     returnArray = returnArray.concat(response.data.results);
                     return getStarshipData(page + 1);
                  })
                  .catch(function() {
                     return returnArray;
                  }
    )};

   useEffect(() => {
      getStarshipData(1).then((response) => {
         if (response != null && response.length > 0) {
            var max = response.sort((a, b) => a.films.length < b.films.length ? 1 : -1)[0].films.length;
            response.max_films = max;

            setStarships(response); 
         }
      })
      .catch(function (error) {
         console.log('Error: ' + error);
      });
   }, []);
   
   if (!starships) {
      return null;
   }

   return (
      <Page>
         <Title>Welcome to Starwars app!</Title>
         <IntroText>
            <p>This web page displays Starwars starship statistics by calling the&nbsp;
               <a href="https://swapi.dev/" target="_blank" rel="noreferrer">Swapi API</a>. 
               Each starship's name, model, crew and number of films are shown on the page. 
               The starships are sorted in order of crew and any starship with crew over 10 
               is removed. The Films Trophy is rewarded for starships that have most film appearances.</p>
            <p>This is a React application that calls the web API with Axios library. The styling 
               of the page is done by using Styled Components.</p>
         </IntroText>
         <TableContainer>
            <Table>
               <THead>
                  <TR>
                     <TH>Image</TH>
                     <TH>Name</TH>
                     <TH>Model</TH>
                     <TH>Crew</TH>
                     <TH>Films</TH>
                     <TH>Films trophy</TH>
                  </TR>
               </THead>
               <TBody>
                  { starships.filter(ship => ship.crew <= 10)
                           .sort((a, b) => a.crew > b.crew ? 1 : -1)
                           .map((ship) => (
                                 <TR key="{ship.name}">
                                    <TDImage><img src="starship.jpg" alt="Starship" width="40px" height="40px" /></TDImage>
                                    <TDName>{ship.name}</TDName>
                                    <TDModel>{ship.model}</TDModel>
                                    <TDCrew>{ship.crew}</TDCrew>
                                    <TDFilms>{ship.films.length}</TDFilms>
                                    <TDFilmsTrophy>
                                    { (starships.max_films == ship.films.length) &&
                                       <img src="trophy.png" alt="Trophy" width="20px" height="20px" />
                                    }
                                    </TDFilmsTrophy>
                                 </TR>
                  ))}
               </TBody>
            </Table>
         </TableContainer>
      </Page>
 );
 };

export default App;
