import {useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../../contexts/AuthContext';

export default function Home() {

    const navigate = useNavigate();

    const { user, getUserAreaPath } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/auth/signin");
        }
        else{
            navigate(getUserAreaPath());
        }
    }, [user]);
    
    return (
        <> 
            <h1 className="text-center">Home</h1>
        </>
    );
}