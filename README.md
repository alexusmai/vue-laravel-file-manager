# laravel-file-manager (Frontend)

> File manager for Laravel - Frontend - Vue.js 

> Backend - Laravel 5 package - [alexusmai/laravel-file-manager](https://github.com/alexusmai/laravel-file-manager)

![Laravel File Manager](https://raw.github.com/alexusmai/vue-laravel-file-manager/master/src/assets/laravel-file-manager.gif?raw=true)

# v 2.4.0

Now you can overwrite default settings using props


## Installation

### NPM
```
$ npm install laravel-file-manager --save
```

## Usage

**IF** your App using Vuex store

```
import FileManager from 'laravel-file-manager'
import store from './path-to-your-store/store'   // your Vuex store

Vue.use(FileManager, {store})
```

**ELSE** you need to create a new vuex instance

```
import Vue from 'vue';
import Vuex from 'vuex';
import FileManager from 'laravel-file-manager'

Vue.use(Vuex);

// create Vuex store, if you don't have it
const store = new Vuex.Store();

Vue.use(FileManager, {store});
```

`The application store module will be registered under the name 'fm'`

You can overwrite some default settings

```
// In the new version 2.4.0 and higher
<file-manager v-bind:settings="settings"></file-manager>

...
// settings object structure
settings: {
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
},
...

// Old versions
Vue.use(FileManager, {
    store, // required
    
    // not required params
    
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ...'
    },
    // default headers example
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'set laravel csrf token here...'
    },
    
    baseUrl: 'http://my_url:80/file-manager/',  // overwrite base url Axios
    windowsConfig: 2,
    lang: 'de',                                 // set language
    translation: {                              // add new translation
        name: de,
        content: {
            about: 'Über',
            back: 'Zurück',
            ... see lang file structure
        },
    },
}
```

Now vue component is registered and you can use it in your app
```
<file-manager></file-manager>
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

## CSRF, Bootstrap, FontAwesome

Don't forget add a csrf token to head block in your Laravel view and add bootstrap 4 and fontawesome 5 styles
```
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<!-- Example -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
```

You can use [environment variables](https://laravel.com/docs/mix#environment-variables)

```
// set baseUrl
MIX_LFM_BASE_URL=http://my-url.loc/file-manager/

// if you don't want to use csrf-token - you can off it
MIX_LFM_CSRF_TOKEN=OFF
```

Warning! Package use axios (Promise) - use babel-polyfill for ie11