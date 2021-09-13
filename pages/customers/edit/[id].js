import { useState, useEffect } from 'react';
import { AddEdit } from 'components/customers';
import useCustomersStore from 'store/customersStore';
export default Edit;

function Edit({ id }) {
  const [customer, setCustomer] = useState(null);
  const [
    getCustomerById,
  ] = useCustomersStore(state => [
    state.getCustomerById,
  ])

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        getCustomerById(id).then((x) => setCustomer(x))
    }, []);

    return (
        <>
          {customer ?
          <AddEdit customer={customer} />
          :
          <span className="spinner-border spinner-border-sm mr-1"></span>
          }
        </>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}