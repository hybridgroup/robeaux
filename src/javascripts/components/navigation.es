import React from "react";

import {Link} from "react-router";

export default React.createClass({
  render: function() {
    return (
      <nav>
      	<div className="container">
	        <Link to="/" className="logo">
	          <img src="/images/logo-robeaux.png" alt="Robeaux" />
	        </Link>
	    </div>
      </nav>
    );
  }
});
