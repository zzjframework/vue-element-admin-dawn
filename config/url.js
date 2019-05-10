import env from './env'

const DEV_URL = 'https://127.0.0.1/'
const PRO_URL = 'https://tyhrf.com'

export default env === 'development' ? DEV_URL : PRO_URL
