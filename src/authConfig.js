import {PublicClientApplication} from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "2c8870e3-5b14-4158-85d9-75f560f0973c",
        authority: "https://login.microsoftonline.com/fc4e1a7f-6958-4a01-afbb-326426499634",
        redirectUri: window.location.origin,
    },

    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const apiRequest = {scopes: ["api://7935b419-031e-484d-9d59-2a66fb97c9a7/access_as_user"]};

export const loginRequest = {
    scopes: ["openid", "email", "profile"],
}

export const msalInstance = new PublicClientApplication(msalConfig);