import React,  { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;


interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface  AuthContextData {
    user: UserProps;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    logOut(): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const userKey = '@gofinances:user'
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserInfo() {
            const userInfo = await AsyncStorage.getItem(userKey);
            
            if(userInfo) {
                const storedUser = JSON.parse(userInfo) as UserProps;
                setUser(storedUser);
            }

            setIsLoading(false);
        }

        loadUserInfo();

    }, [])

    async function signInWithGoogle() {

        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
    
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    
            const {params, type} = await AuthSession.startAsync( { authUrl } ) as AuthorizationResponse;
            
            if(type === "success") {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const loggedUser = {
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture
                  }
                setUser(loggedUser)
                
                await AsyncStorage.setItem(userKey, JSON.stringify(loggedUser))
            }


        }catch (error) {
            throw new Error(error);
        }

    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (credential) {
                const name = credential.fullName?.givenName!
                const userInfo = {
                    id: credential.authorizationCode!,
                    name,
                    email: credential.email!,
                    photo: `https://ui-avatars.com/api/?name=${name}&length=1`   
                  }

                setUser(userInfo);
                await AsyncStorage.setItem(userKey, JSON.stringify(userInfo))
            }
            
        } catch (error) {
            
        }
    }

    async function logOut() {
        setUser({} as UserProps);
        await AsyncStorage.removeItem(userKey);
    }

    

    return (
        <AuthContext.Provider 
            value={
                {
                    user,
                    signInWithGoogle,
                    signInWithApple,
                    logOut,
                    isLoading 
                } 
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}