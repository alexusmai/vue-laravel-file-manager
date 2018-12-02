# laravel-file-manager (Frontend)

> File manager for Laravel - Frontend - Vue.js 

> Backend - Laravel 5 package - [alexusmai/laravel-file-manager](https://github.com/alexusmai/laravel-file-manager)

![Laravel File Manager](https://raw.github.com/alexusmai/vue-laravel-file-manager/master/src/assets/laravel-file-manager.gif?raw=true)

# v 2.0.0

* Audio player (mp3, ogg, wav, aac), Video player (webm, mp4) - ([Plyr](https://github.com/sampotts/plyr))
* Code editor - ([Code Mirror](https://github.com/codemirror/codemirror))
* Image cropper - ([Cropper.js](https://github.com/fengyuanchen/cropperjs))
* Zip / Unzip - only for local disks


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

**ELSE** you need create new vuex instance

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
Vue.use(FileManager, {
    store, // required
    
    // not required params
    headers: {'Authorization': 'Bearer ...'}, // add header
    // OR
    headers: {'X-CSRF-TOKEN': 'token'}, // overwrite default header Axios
    baseUrl: 'http://my_url:80/file-manager/', // overwrite base url Axios
    windowsConfig: 2,
    lang: 'de',     // set language
    translation: {  // add new translation
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

Don't forget add a csrf token to head block in your Laravel view and add bootstrap 4 and fontawesome 5 styles
```
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<!-- Example -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
```

Warning! Package use axios (Promise) - use babel-polyfill for ie11
