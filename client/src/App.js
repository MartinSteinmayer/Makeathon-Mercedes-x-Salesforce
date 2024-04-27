import React, {useState, useEffect} from "react";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => setData(data));
  } , []);

  return (
    <div>
      {(typeof data.members !== 'undefined') ? data.members.map((member, i) => (
        <div key={i}>
          <h1>{member.name}</h1>
          <p>{member.age}</p>
        </div>
      )) : <p>loading...</p>
      }
    </div>
  );
}

export default App;