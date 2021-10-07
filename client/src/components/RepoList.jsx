import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repos </h4>
    <ul>
      {props.repos.map(repo => <Repo repo={repo} />)}
    </ul>
  </div>

)

export default RepoList;