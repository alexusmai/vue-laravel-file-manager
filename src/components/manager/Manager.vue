<template>
    <div class="fm-content d-flex flex-column">
        <disk-list v-bind:manager="manager" />
        <bread-crumb v-bind:manager="manager" />
        <div class="fm-content-body">
            <table-view v-if="viewType === 'table'" v-bind:manager="manager" />
            <grid-view v-else v-bind:manager="manager" />
        </div>
    </div>
</template>

<script>
// Components
import DiskList from './DiskList.vue';
import BreadCrumb from './BreadCrumb.vue';
import TableView from './TableView.vue';
import GridView from './GridView.vue';

export default {
    name: 'Manager',
    components: {
        DiskList,
        BreadCrumb,
        TableView,
        GridView,
    },
    props: {
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * view type - grid or table
         * @returns {any}
         */
        viewType() {
            return this.$store.state.fm[this.manager].viewType;
        },
    },
};
</script>

<style lang="scss">
.fm-content {
    padding-left: 1rem;

    .fm-content-body {
        overflow: auto;
    }
}
</style>
