import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: #0094C6;
  font-family: Orbitron, Calibri;
`;

export const IntroText = styled.div`
   margin: 10px 10px 40px 10px;
`;

export const Page = styled.div`
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

export const TableContainer = styled.div`
   overflow-x:auto;
`;

export const Table = styled.table`
   border: 2px solid #005E7C;
   border-collapse: collapse;
   margin-top: 20px;
   background-color: black;
   color: white;
   font-family: Orbitron, Calibri;
`;

export const THead = styled.thead`
`;

export const TBody = styled.tbody`
`;

export const TR = styled.tr`   
   background-color: #f8f8f8;
   border: 1px solid #0094C6;
   padding: .35em;
`;

export const TH = styled.th`
   padding: .625em;
   text-align: left;
   font-size: .85em;
   letter-spacing: .1em;
   text-transform: uppercase;
   background-color: #005E7C; /*CE84AD*/
   border: 2px solid #0094C6;
`;

export const TD = styled.td`
   padding: .625em;
   border: 2px solid #0094C6;
   text-align: left;
   background-color: black;
   font-size: .85em;
`;

export const TDImage = styled(TD)`
   max-width: 40px;
   padding: .125em;
   text-align: center;
`;

export const TDName = styled(TD)`
   min-width: 180px;
`;

export const TDModel = styled(TD)`
   min-width: 180px;
`;

export const TDCrew = styled(TD)`
   text-align: center;
   width: 60px;
`;

export const TDFilms = styled(TD)`
   width: 60px;
   text-align: center;
`;

export const TDFilmsTrophy = styled(TD)`
   width: 50px;
   text-align: center;
`;
