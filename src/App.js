import React, { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";

function App() {
  const query = gql`
    query {
      categories {
        name
      }
    }
  `;
  const { error, loading, data } = useQuery(query);
  const [cate, setCate] = useState([]);
  useEffect(() => {
    const { categories } = data;
    // console.log(categories);
    setCate(categories);
  }, [data]);
  return (
    <div>
      {cate.map((c) => (
        <p>{c.name}</p>
      ))}
    </div>
  );
}

export default App;
