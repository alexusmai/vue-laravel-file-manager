<template>
    <div class="fm-tree">
        <div class="fm-tree-disk sticky-top">
            <i class="far fa-hdd"></i> {{ selectedDisk }}
        </div>
        <branch v-bind:parent-id="0"></branch>
    </div>
</template>

<script>
import Branch from './Branch';

export default {
  name: 'FolderTree',
  components: {
    branch: Branch,
  },
  computed: {
    // Selected Disk
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },
  },
};
</script>

<style lang="scss">
    .fm-tree {
        overflow: auto;
        border-right: 1px solid #6d757d;

        & > .fm-folders-tree {
            padding-left: 0.2rem;
        }

        .fm-tree-disk {
            padding: 0.2rem 0.3rem;
            margin-bottom: 0.3rem;
            background-color: white;
        }

        .fm-tree-disk > i {
            padding-left: 0.2rem;
            padding-right: 0.5rem;
        }
    }
</style>
