import isDev from "./isDev";

import './isDev';

const utils = {

    baseUrl: isDev() ? "https://localhost:44358" : "https://robocam2.brodev.info"

}

export default utils;