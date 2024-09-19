import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

export default function Home() {
  return (
    <div className="container">
      <h1 className="my-4">User Management</h1>

      <div className="row">
        <div className="col-md-6">
          <UserForm />
        </div>

        <div className="col-md-6">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
