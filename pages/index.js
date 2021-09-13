import { useState, useEffect } from 'react';
import { Link } from 'components';
import { userService } from 'services';

export default Home;

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="card mt-4">
      <h4 className="card-header">Welcome {user?.username}! 🥳</h4>
      <div className="card-body">
        <Link href="/customers">&gt;&gt;&nbsp;
          {user?.isAdmin ? 'Manage Customers' : 'View Customers'}
        </Link>
      </div>
    </div>
  );
}
