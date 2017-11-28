import React from 'react';


class Sidebar extends React.Component {


  render() {
    return (
      <div className="sidebar">
        <h3>Hello! Thanks for checking out out my project.</h3>
        <p>I've built this in an effort to pull everything I've learned about building modern JavaScript apps together into something a bit more challenging and useful.</p>
        <p>The meat of Kanban! is build with:</p>
        <ul>
        	<li>React/Redux</li>
        	<li>RethinkDB</li>
        	<li>Express</li>
        </ul>
        <p>and it's hosted with:</p>
        <ul>
        	<li>AWS s3 (static react bundle)</li>
        	<li>AWS ec2 Ubuntu (api server and database)</li>
        </ul>
        <p><strong>This is a work in progress.</strong> If you have any comments, requests, or find a bug, my contact information is available on my <a href="https://simplicitea.github.com">personal site</a>.</p>
        <p>The codebase for both the <a href="https://github.com/simplicitea/kanban-client/">client</a> and the <a href="https://github.com/simplicitea/kanban-backend/">server</a> is available open-source as-is on my GitHub.</p>
        <p>Thanks again, and happy building y'all</p>
      </div>
    )
  }
}


export default Sidebar;
