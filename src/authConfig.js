import {PublicClientApplication} from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
        authority: process.env.REACT_APP_AZURE_AUTHORITY,
        redirectUri: window.location.origin,
    },

    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const apiRequest = {scopes: [`api://${process.env.REACT_APP_AZURE_API_CLIENT_ID}/access_as_user`]};

export const msalInstance = new PublicClientApplication(msalConfig);