import { useContext} from 'react';
import { UserContext } from '../../context/userContext';

function Dashboard() {

    const { user } = useContext(UserContext);

    return (
        <div className='main'>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hi, {user.name}..!!</h2>)}
        </div>
    )
}
export default Dashboard
