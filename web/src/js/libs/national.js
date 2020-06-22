
import File from "./file.js";
const { csv2Array } = File;

const getFile = async () => {
    let res = await fetch(
        `https://raw.githubusercontent.com/aiosk/covidn/master/dist/update.csv?_=${Date.now()}`
    );
    let resTxt = await res.text();

    return csv2Array(resTxt);
};

export default { getFile };
