<template>
    <div class="fm-tree">
        <div class="fm-tree-disk sticky-top"><i class="bi bi-hdd"></i> {{ selectedDisk }}</div>
        <branch v-bind:parent-id="0" />
    </div>
</template>

<script>
import Branch from './TreeBranch.vue';

export default {
    name: 'FolderTree',
    components: {
        branch: Branch,
    },
    computed: {
        /**
         * Selected Disk
         * @returns {*}
         */
        selectedDisk() {
            return this.$store.getters['fm/selectedDisk'];
        },
    },
};
</script>

<style lang="scss">
.fm-tree {
    overflow: auto;
    border-right: 1px solid #6c757d;

    & > .fm-tree-branch {
        padding-left: 0;
    }

    .fm-tree-disk {
        padding: 0.2rem 0.3rem;
        background-color: #cff4fc;
    }

    .fm-tree-disk > i {
        padding-right: 0.4rem;
    }
}
</style>
