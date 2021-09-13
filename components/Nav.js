import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;
  
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Customers app 🔥</a>
      <button className="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#collapsingNavbar2">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse justify-content-between align-items-center w-100" id="collapsingNavbar2">
        <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
        
        <ul className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
          <a onClick={logout} className="nav-item nav-link">Logout</a>
        </ul>
      </div>
      
    </nav>
  );
}