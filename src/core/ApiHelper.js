import {apiRequest} from "../authConfig";
import axios from "axios";

export async function callBackend(instance, accounts) {
    console.log(accounts);
    const account = accounts[0];
    console.log(account);
    const tokenResponse = await instance.acquireTokenSilent({
        ...apiRequest,
        account,
    });
    const accessToken = tokenResponse.accessToken;

    const fetch = async () => {
        try {
            const res = (await axios.get('http://localhost:1409/api/hello', {
                headers: {Authorization: "Bearer " + accessToken},
            }));
            console.log(res.data);
        } catch (err) {
            console.error('Error fetching items', err);
        }
    };
}