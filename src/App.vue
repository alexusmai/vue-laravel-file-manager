<template>
  <div id="app">
    Hello, this is laravel file manager.
    <file-manager
    
    ></file-manager>
  </div>
</template>

<script>
import FileManager from './FileManager';
export default { 
  name: 'App',
  components: {
    FileManager
  },
  data() {
    return {
      initData:{
        disk: "hb36p",
        editable: false,
        sessionToken: "token"
      }
    }
  },
  created() {
        // set initialize data
    this.$store.commit('fm/setInitData', this.initData);
  }
} 
</script>
  