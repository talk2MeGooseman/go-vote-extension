import axios from "axios";

const EBS_ROOT_URL = ' https://us-central1-go-vote-66ebb.cloudfunctions.net/';

/**
 * getBoardcasterGithubInfo
 * 
 * Fetch user Github panel configuration
 * 
 * @param {Object} auth 
 */
export const getSettings = async (auth) => {
    let response = await axios({
        method: 'GET',
        url: `${EBS_ROOT_URL}/getSettings`,
        headers: {
            'x-extension-jwt': auth.token,
        }
    });

    return response.data;
};

/**
 * setBroadcasterGithubInfo 
 *
 * Set the users Github login information and fetch it
 *  
 * @param {Object} data - github user login info
 * @param {auth} auth 
 */
export const setSettings = async (auth, data) => {
    let response = await axios({
        method: 'POST',
        url: `${EBS_ROOT_URL}/setSettings`,
        data: data,
        headers: {
            'x-extension-jwt': auth.token,
        }
    });

    return response.data;
};
