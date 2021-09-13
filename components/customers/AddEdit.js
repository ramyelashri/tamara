import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import useCustomersStore from 'store/customersStore';
import * as Yup from 'yup';
import { Link } from 'components';

export { AddEdit };

function AddEdit(props) {
  const customer = props?.customer;
  const isAddMode = !customer;

  const [
    createCustomer,
    updateCustomer,
  ] = useCustomersStore(state => [
    state.createCustomer,
    state.updateCustomer,
  ])
  
  // form validation rules 
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('First Name is required'),
    last_name: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    phone_number: Yup.string()
      .required('Phone number is required'),
    gender: Yup.string()
      .required('Gender number is required'),
    birth_date: Yup.string()
      .required('Birth date number is required'),
    country_code: Yup.string()
      .required('Country is required'),
    address: Yup.object().shape({
      street: Yup.string().required(),
      city: Yup.string().required('City is required'),
      postal_code: Yup.string(),
    }),
    is_email_verified: Yup.string()
      .required('Required'),
    is_id_verified: Yup.string()
      .required('Required'),
    national_id: Yup.string()
      .required('Required'),
    status: Yup.string()
      .required('Required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    const { ...defaultValues } = customer;
    formOptions.defaultValues = defaultValues;
  } else {
    // Add sample customer data so I won't have to fill it while testing
    const sampleCustomerData = {
      "customer_id": uuidv4(),
      "email": `${uuidv4().slice(-10)}@example.com`,
      "first_name": "First",
      "last_name": "Last",
      "phone_number": "+97150000000",
      "gender": "MALE",
      "birth_date": "2002-03-29",
      "country_code": "AE",
      "address": {
          "street": "street test",
          "city": "city test",
          "postal_code": "00000"
      },
      "is_email_verified": "true",
      "is_id_verified": "false",
      "national_id": "123456789",
      "status": "ACTIVE"
    }
    formOptions.defaultValues = sampleCustomerData;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode
      ? createCustomer(data)
      : updateCustomer(customer.customer_id, data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? 'Add Customer' : 'Edit Customer'}</h1>
      <div className="form-row">
        <div className="form-group col-6">
          <label>First Name</label>
          <input name="first_name" type="text" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.first_name?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Last Name</label>
          <input name="last_name" type="text" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.last_name?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-6">
          <label>Email</label>
          <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Phone number</label>
          <input name="phone_number" type="text" {...register('phone_number')} className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.phone_number?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Gender</label>
          <select name="gender" {...register('gender')} className={`form-control ${errors.gender ? 'is-invalid' : ''}`}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <div className="invalid-feedback">{errors.gender?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Country</label>
          <select name="country_code" {...register('country_code')} className={`form-control ${errors.country_code ? 'is-invalid' : ''}`}>
            <option value=""></option>
            <option value="SA">Saudi Arabia</option>
            <option value="AE">Female</option>
          </select>
          <div className="invalid-feedback">{errors.country_code?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Birth date</label>
          <input name="birth_date" type="date" {...register('birth_date')} className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.birth_date?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Street</label>
          <input name="address.street" type="text" {...register('address.street')} className={`form-control ${errors.address?.street ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.address?.street?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>City</label>
          <input name="address.city" type="text" {...register('address.city')} className={`form-control ${errors.address?.city ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.address?.city?.message}</div>
        </div>
        
        <div className="form-group col-6">
          <label>Postal code</label>
          <input name="address.postal_code" type="text" {...register('address.postal_code')} className={`form-control ${errors.address?.postal_code ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.address?.postal_code?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Is email verified?</label>
          <select name="is_email_verified" {...register('is_email_verified')} className={`form-control ${errors.is_email_verified ? 'is-invalid' : ''}`}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <div className="invalid-feedback">{errors.is_email_verified?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Is id verified?</label>
          <select name="is_id_verified" {...register('is_id_verified')} className={`form-control ${errors.is_id_verified ? 'is-invalid' : ''}`}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <div className="invalid-feedback">{errors.is_id_verified?.message}</div>
        </div>
        
        <div className="form-group col-6">
          <label>National id</label>
          <input name="national_id" type="text" {...register('national_id')} className={`form-control ${errors.national_id ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.national_id?.message}</div>
        </div>

        <div className="form-group col-6">
          <label>Status</label>
          <select name="status" {...register('status')} className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
            <option value="INACTIVE">inactive</option>
            <option value="ACTIVE">Active</option>
          </select>
          <div className="invalid-feedback">{errors.status?.message}</div>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
          {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
          {isAddMode ? 'Add new customer' : 'Save Customer'}
        </button>
        <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
        <Link href="/customers" className="btn btn-link">Cancel</Link>
      </div>
    </form>
  );
}