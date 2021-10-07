import React from 'react';

const Repo = ({repo}) => (
  <div>
    <h4><a href={repo.repoUrl}>{repo.repoName}</a></h4>
    <p>Owner: {repo.username}</p>
    <p>Forks: {repo.forks}</p>
    <p>--------------------------</p>
  </div>
)

export default Repo;