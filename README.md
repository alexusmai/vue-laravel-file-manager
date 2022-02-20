# Laravel file manager (Frontend)

> Backend - Laravel package - [alexusmai/laravel-file-manager](https://github.com/alexusmai/laravel-file-manager)

![Laravel File Manager](https://raw.github.com/alexusmai/vue-laravel-file-manager/master/src/assets/laravel-file-manager.gif?raw=true)

# New in version 3

- Vue.js 3
- Bootstrap 5
- Bootstrap icons

## Installation

### NPM
```
$ npm install laravel-file-manager --save
```

## Usage

**IF** your App using Vuex store

```
import { createApp } from 'vue';
import { createStore } from 'vuex';

// Source main component
import Main from './components/Main.vue';
import FileManager from 'laravel-file-manager'
// your Vuex store
import store from './path-to-your-store/store'  

createApp(Main).use(store).use(FileManager, {store}).mount('#id');
```

**ELSE** you need to create a new vuex instance

```
import { createApp } from 'vue';
import { createStore } from 'vuex';

// Source main component
import Main from './components/Main.vue';
import FileManager from 'laravel-file-manager'

// Create a new store instance.
const store = createStore();

createApp(Main).use(store).use(FileManager, {store}).mount('#id');
```

`The application store module will be registered under the name 'fm'`

Now vue component is registered and you can use it in your app
```
<file-manager></file-manager>
```

### You can overwrite some default settings

```
// In the new version 2.4.0 and higher
<file-manager v-bind:settings="settings"></file-manager>

...
// settings object structure
computed: {
        settings() {
            return {
                // axios headers
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  Authorization: `Bearer ${window.localStorage.getItem('user-token')}`,
                },
                baseUrl: 'http://test.loc/file-manager/',   // overwrite base url Axios
                windowsConfig: 2,                           // overwrite config
                lang: 'de',                                 // set language
                translation: {                              // add new translation
                    name: de,
                    content: {
                        about: 'Über',
                        back: 'Zurück',
                        ... see lang file structure
                    },
                },
            };
        },
    }
...


```

## Available Props

### settings - Object

|  Attribute  |  Type  |  Example  |  Required  |  Description  |
|  ---------  |  ----  |  -------  |  --------  |  -----------  |
|  headers    |     Object     |  {'X-Requested-With': 'XMLHttpRequest'}  |  No  | Axios Headers |
|  baseUrl    |     String     |  'http://my_url:80/file-manager/'  |  No  | Axios base URL |
|  windowsConfig    |     Int     |  2  |  No  | 1 - only one manager, 2 - manager with folder tree, 3 - two managers |
|  lang    |     String     |  'de'  |  No  | Set language |
|  translation    |     Object     |  { ... see lang file structure },  |  No  | Add new translation |

## CSRF, Bootstrap, Bootstrap icons

Don't forget to add a csrf token to head block in your Laravel view and add bootstrap 5 and bootstrap icons 5 styles
```
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<!-- Example -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
```

[Laravel mix environment variables](https://laravel.com/docs/mix#environment-variables)
```
// set baseUrl
MIX_LFM_BASE_URL=http://my-url.loc/file-manager/

// if you don't want to use csrf-token - you can off it
MIX_LFM_CSRF_TOKEN=OFF
```
