const tzlookup = require('tz-lookup');
const geoip = require('geoip-lite');


async function getTimezoneFromIPAddress(ipAddress) {
    try {
        const coordinates = extractCoordinates(ipAddress);
        if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
            throw new Error('Invalid coordinates');
        }
        const timeZone = await tzlookup(coordinates.latitude, coordinates.longitude);
        console.log("error", timeZone);
        return timeZone || 'UTC'; 
    } catch (error) {
        console.error('Error getting timezone from IP:', error.message);
        return 'UTC'; 
    }
}function extractCoordinates(ipAddress) {
    const geo = geoip.lookup(ipAddress);
    console.log("Error" , geo)
    if (geo && geo.ll && geo.ll.length == 2) {
        const [latitude, longitude] = geo.ll;
        return { latitude, longitude };
    } else {
        return null; 
    }
}

module.exports = { getTimezoneFromIPAddress };
