import React, { useState, useEffect } from 'react';
import List from "./List.js";
import Header from "./Header.js";
import './App.css';

function App() {
  const [lists, setDetails] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    let endpoint = `https://hn.algolia.com/api/v1/search?query=${query}&tags=story`;
    fetch(endpoint)
    .then((response) => response.json())
    .then((response) => {
        setLoading(false);
        const newList = response.hits.map((result) => ({
          text: result.title,
          url: result.url,
          comments: result.num_comments,
        }))
      .sort((a, b) => (a.num_comments > b.num_comments ? -1:1));
      setDetails(newList);
      setQuery(response.query);
    })
    // Error handling
    .catch(error => {
      setLoading(false);
      alert(error);
    });
  }

  useEffect(() => {
      fetchData();
      // Automatic data refresh after 5 minutes
      const interval = setInterval(() => {
        fetchData();
      }, 300000);
      return () => clearInterval(interval);
  }, [query]);

  if (window.location.pathname === "/3") {
    return (
      <div className="wrp">
        <div className="page">
          <Header setQuery={setQuery} />
          <div className="detail">
            <h1>Restaurant profile Page</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <div className="map">map</div>
            <div className="clear"></div>
            <h2>Comments</h2>
            <ul>
              <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</li>
              <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</li>
              <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</li>
            </ul>
          </div>
          <div className="contact">CTA</div>
        </div>
      </div>
      );
  } 
  console.log(window.location.pathname);
  if (query === "") {
    return (
      <div className="wrp">
      <div className="page">
        <Header setQuery={setQuery} />

        </div>
    </div>
      );
  } else {

   return (
    <div className="wrp">
      <div className="page">
        <Header setQuery={setQuery} />
        <div className="filter">Filter</div>
        <div className="list">
          {/*Display spinner if news are loading*/}
          <div className="loader-container" style={loading ? {display:"block"} : {display:"none"}}> 
            <div className="loader"></div>
          </div>
          <section className="SearchResults" style={loading ? {display:"none"} : {display:"block"}}>
            <div className="SearchResults_container">
              {/*Check if search gave results*/}
              <div className="search-term">{lists.length ? `Restaurants in "${query}": ` : `No restaurants found in "${query}"`}</div>
              {lists.map((list, index) => (
                <List
                  key={index}
                  index={index}
                  list={list}
                />
              ))}
            </div>
          </section>
        </div>
        <div className="map">map</div>
      </div>
    </div>
  );

              }


}

export default App;