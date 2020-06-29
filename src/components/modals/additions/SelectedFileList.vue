<template>
    <div class="fm-additions-file-list">
        <div class="d-flex justify-content-between"
             v-for="(item, index) in selectedItems"
             v-bind:key="index">
            <div class="w-75 text-truncate">
                <span v-if="item.type === 'dir'">
                    <i class="far fa-folder"/>{{ item.basename }}
                </span>
                <span v-else>
                    <i class="far" v-bind:class="extensionToIcon(item.extension)"/> {{ item.basename }}
                </span>
            </div>
            <div class="text-right" v-if="item.type === 'file'">
                {{ bytesToHuman(item.size) }}
            </div>
        </div>
    </div>
</template>

<script>
import helper from '../../../mixins/helper';

export default {
  name: 'SelectedFileList',
  mixins: [helper],
  computed: {
    /**
     * Selected files and folders
     * @returns {*}
     */
    selectedItems() {
      return this.$store.getters['fm/selectedItems'];
    },
  },
};
</script>

<style lang="scss">
    .fm-additions-file-list {
        .far {
            padding-right: 0.5rem;
        }
    }
</style>
