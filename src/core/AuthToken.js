import {InteractionRequiredAuthError} from "@azure/msal-browser";
import {apiRequest, msalInstance} from '../authConfig';

export async function getAuthToken() {
    const accounts = msalInstance.getAllAccounts();

    if (!accounts.length) {
        throw new Error("User is not authenticated");
    }

    try {
        const response = await msalInstance.acquireTokenSilent({...apiRequest, account: accounts[0]});
        return response.accessToken;
    } catch (e) {
        if (e instanceof InteractionRequiredAuthError) {
            const response = await msalInstance.acquireTokenPopup({...apiRequest, account: accounts[0]});
            return response.accessToken;
        }
        throw e;
    }
}
