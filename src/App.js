import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Page, Table, TableContainer, THead, TH, Title, IntroText, TR, TDImage, TDName, TDModel, 
   TBody, TDCrew, TDFilms, TDFilmsTrophy} from './App.styled'

/**
 * This web page displays Starwars starship statistics by calling the https://swapi.dev/ API. 
 * Each starship's name, model, crew and number of films are shown on the page. The starships 
 * are sorted in order of crew and any starship with crew over 10 is removed. The Films Trophy
 * is rewarded for starships that have most film appearances. 
 * 
 * This is a React application that calls the web API with Axios library. The styling of the 
 * page is done by using Styled Components.
 */
const App = () => {
   const [starships, setStarships] = useState(null);
   var returnArray = [];
   
   // Call Starwars API for every page recursively
   function getStarshipData(page) {
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
            // Calculate most films starships have
            var maxFilms = response.sort((a, b) => a.films.length < b.films.length ? 1 : -1)[0].films.length;
            response.maxFilms = maxFilms;

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
                                    { (starships.maxFilms === ship.films.length) &&
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
