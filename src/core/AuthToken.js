import {apiRequest, msalInstance} from '../authConfig';

export async function getAuthToken() {
    const accounts = msalInstance.getAllAccounts();

    if (!accounts) {
        throw new Error("User does not authorized");
    }

    const response = await msalInstance.acquireTokenSilent({...apiRequest, account: accounts[0]});

    return response.accessToken;
}