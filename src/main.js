import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faPlus,
    faArrowLeft,
    faChevronLeft,
    faTrashCan,
    faCircleExclamation,
    faPencil,
    faCheck,
    faArrowRightArrowLeft,
    faArrowDownWideShort,
    faArrowUpWideShort,
    faArrowDownAZ,
    faArrowDownZA,
    faFilter,
    faXmark,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faPlus,
    faArrowLeft,
    faChevronLeft,
    faTrashCan,
    faCircleExclamation,
    faPencil,
    faCheck,
    faArrowRightArrowLeft,
    faArrowDownWideShort,
    faArrowUpWideShort,
    faArrowDownAZ,
    faArrowDownZA,
    faFilter,
    faXmark,
    faChevronDown
)

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
