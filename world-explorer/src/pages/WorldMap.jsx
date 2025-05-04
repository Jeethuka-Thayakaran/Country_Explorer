// import React, { useEffect, useState } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { feature } from 'topojson-client';
// import { fetchAllCountries } from '../api/countries';
// import { Tooltip } from 'react-tooltip';

// const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// const WorldMapWithLanguages = () => {
//   const [countryData, setCountryData] = useState([]);
//   const [geoFeatures, setGeoFeatures] = useState([]);
//   const [hoveredCountry, setHoveredCountry] = useState(null);

//   useEffect(() => {
//     const loadCountries = async () => {
//       const data = await fetchAllCountries();
//       setCountryData(data);
//     };

//     const loadMap = async () => {
//       const res = await fetch(geoUrl);
//       const world = await res.json();
//       const countries = feature(world, world.objects.countries).features;
//       setGeoFeatures(countries);
//     };

//     loadCountries();
//     loadMap();
//   }, []);

//   const getCountryInfo = (isoNumeric) => {
//     if (!isoNumeric) return { region: 'Unknown', languages: [], name: '', flag: '' };

//     const isoString = isoNumeric.toString().padStart(3, '0');
//     const country = countryData.find((c) => c.ccn3 === isoString);

//     if (!country) {
//       return { region: 'Unknown', languages: [], name: '', flag: '' };
//     }

//     return {
//       region: country.region || 'Unknown',
//       languages: Object.values(country.languages || {}),
//       name: country.name.common,
//       flag: country.flags?.png || '',  // Assuming flag URL is available
//     };
//   };

//   const handleMouseEnter = (isoCode) => {
//     const info = getCountryInfo(isoCode);
//     setHoveredCountry(info); // Set the hovered country info
//   };

//   const handleMouseLeave = () => {
//     setHoveredCountry(null); // Clear the hovered country info
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         padding: '20px',
//         boxSizing: 'border-box',
//         textAlign: 'center',
//       }}
//     >
//       <h2 style={{ marginBottom: '20px' }}>World Map - Regions & Languages</h2>
//       <div
//         style={{
//           overflowX: 'auto',
//           width: '1000px',
//           margin: '0 auto',
//         }}
//       >
//         <ComposableMap
//           projection="geoMercator"
//           projectionConfig={{ scale: 100 }}
//           style={{
//             width: '100%',
//             height: 'auto',
//           }}
//         >
//           <Geographies geography={geoFeatures}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 const isoCode = geo.id;
//                 const info = getCountryInfo(isoCode);
//                 const fillColor = regionColors[info.region] || '#E0E0E0';

//                 return (
//                   <React.Fragment key={geo.rsmKey}>
//                     <Geography
//                       geography={geo}
//                       data-tooltip-id={isoCode}
//                       data-tooltip-html={`<strong>${info.name}</strong><br /><strong>Region:</strong> ${info.region}<br /><strong>Languages:</strong> ${info.languages.join(', ')}`}
//                       style={{
//                         default: { fill: fillColor, outline: 'none' },
//                         hover: { fill: '#F53', outline: 'none', cursor: 'pointer' },
//                         pressed: { fill: '#E42', outline: 'none' },
//                       }}
//                       onMouseEnter={() => handleMouseEnter(isoCode)}  // Trigger hover event
//                       onMouseLeave={handleMouseLeave}  // Trigger mouse leave event
//                     />
//                     <Tooltip id={isoCode} />
//                   </React.Fragment>
//                 );
//               })
//             }
//           </Geographies>

//           {/* Region Labels */}
//           {Object.entries(regionPositions).map(([region, position]) => {
//             return (
//               <text
//                 key={region}
//                 x={position.x}
//                 y={position.y}
//                 textAnchor="middle"
//                 style={{
//                   fontSize: '12px',
//                   fill: '#333',
//                   fontWeight: 'bold',
//                   pointerEvents: 'none',
//                   textShadow: '1px 1px 2px white',
//                 }}
//               >
//                 {region}
//               </text>
//             );
//           })}
//         </ComposableMap>
//       </div>

//       {/* Country Info Card */}
//       {hoveredCountry && (
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '10px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             background: '#fff',
//             padding: '10px',
//             borderRadius: '8px',
//             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//             maxWidth: '300px',
//             zIndex: '1000',
//           }}
//         >
//           <h3>{hoveredCountry.name}</h3>
//           <img
//             src={hoveredCountry.flag}
//             alt={`${hoveredCountry.name} flag`}
//             style={{ width: '50px', height: '30px', marginBottom: '10px' }}
//           />
//           <p><strong>Region:</strong> {hoveredCountry.region}</p>
//           <p><strong>Languages:</strong> {hoveredCountry.languages.join(', ')}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const regionColors = {
//   Africa: '#FFD54F',
//   Americas: '#4FC3F7',
//   Asia: '#AED581',
//   Europe: '#CE93D8',
//   Oceania: '#FF8A65',
//   Antarctic: '#B0BEC5',
// };

// const regionPositions = {
//   Africa: { x: 430, y: 280 },
//   Americas: { x: 200, y: 180 },
//   Asia: { x: 550, y: 240 },
//   Europe: { x: 570, y: 160 },
//   Oceania: { x: 630, y: 350 },
//   Antarctic: { x: 400, y: 550 },
// };

// export default WorldMapWithLanguages;
