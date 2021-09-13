import { useState, useEffect } from 'react';
import { Link } from 'components';
import { userService } from 'services';
import useCustomersStore from 'store/customersStore';

export default Index;

function Index() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);

  const [
    getCustomers,
    customers,
    deleteCustomer,
    loading,
    success
  ] = useCustomersStore(state => [
    state.getCustomers,
    state.customers,
    state.deleteCustomer,
    state.loading,
    state.success
  ])
  
  useEffect(() => {
    getCustomers(page);
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, [page]);

  return (
    <div>
      <h1>Customers</h1>
      {user?.isAdmin &&
        <Link href="/customers/add" className="btn btn-sm btn-success mb-2">Add Customer</Link>
      }
      <div class="table-responsive">
        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {!loading && success && customers?.length > 0 && customers.map((customer, index) =>
            <tr key={customer.customer_id}>
              <td>{index+1}</td>
              <td>{customer.first_name} {customer.last_name}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                 {user?.isAdmin &&
                 <>
                   <Link href={`/customers/edit/${customer.customer_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                  <button onClick={() => user?.isAdmin ? deleteCustomer(customer.customer_id) : null} className="btn btn-sm btn-danger btn-delete-user">
                    {customer.isDeleting 
                      ? <span className="spinner-border spinner-border-sm"></span>
                      : <span>Delete</span>
                    }
                  </button>
                 </>
                 }
              </td>
            </tr>
          )}
          {loading &&
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          }
          {!loading && success && customers?.length === 0 &&
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Customer To Display</div>
              </td>
            </tr>
          }
          {!loading && !success &&
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Error getting customers, please refresh..</div>
              </td>
            </tr>
          }
        </tbody>
      </table>
      </div>
      <br/>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><a className="page-link" onClick={() => setPage(page !==1 ? page-1 : page)} >Previous</a></li>
          <li className="page-item"><a className="page-link" onClick={() => setPage(page+1)}>Next</a></li>
        </ul>
      </nav>
    </div>
  );
}