import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTextRange } from 'typescript';

interface ProtectedProps {
    element: React.ComponentType<any>;
}

function Protected({ element: Component, ...rest }: ProtectedProps) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <Component {...rest} />;
}

export default Protected;