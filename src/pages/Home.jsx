import React, { useState, useEffect } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
// 2.06.25
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <h2>Trending</h2>
          <div className="col-md-8">
            <h2>Blog Section</h2>
          </div>
          <div className="col-md-3">
            <h2>tags</h2>
            <h2>Most Popular</h2>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Home