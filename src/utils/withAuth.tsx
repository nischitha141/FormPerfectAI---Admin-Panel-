'use client'
 
import { useRouter } from 'next/navigation'
import { useEffect, useState, ComponentType } from "react";
import { getToken } from "@lib/auth";

function withAuth(WrappedComponent: ComponentType) {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (!isMounted) return;

      const token = getToken();
      if (!token) {
        router.replace("/auth/login");
      }
    }, [isMounted, router]);

    // Don't render anything until mounted
    if (!isMounted) return null;

    return <WrappedComponent {...props}/>
  };

  return Wrapper;
}

export default withAuth;
