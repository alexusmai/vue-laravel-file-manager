<template>
    <div class="fm-grid">
        <div class="d-flex align-content-start flex-wrap">
            <div class="fm-grid-item text-center" v-on:click="levelUp">
                <div class="fm-item-icon">
                    <i class="fas fa-level-up-alt fa-5x pb-2"></i>
                </div>
                <div class="fm-item-info"><strong>..</strong></div>
            </div>

            <div class="fm-grid-item text-center unselectable"
                 v-for="(directory, index) in directories"
                 v-bind:key="`d-${index}`"
                 v-bind:title="directory.basename"
                 v-bind:class="{'active': checkSelect('directories', directory.path)}"
                 v-on:click="selectItem('directories', directory.path, $event)"
                 v-on:dblclick.stop="selectDirectory(directory.path)"
                 v-on:contextmenu.prevent="contextMenu(directory, $event)">
                <div class="fm-item-icon">
                    <i class="far fa-folder fa-5x pb-2"></i>
                </div>
                <div class="fm-item-info">{{ directory.basename }}</div>
            </div>

            <div class="fm-grid-item text-center unselectable"
                 v-for="(file, index) in files"
                 v-bind:key="`f-${index}`"
                 v-bind:title="file.basename"
                 v-bind:class="{'active': checkSelect('files', file.path)}"
                 v-on:click="selectItem('files', file.path, $event)"
                 v-on:contextmenu.prevent="contextMenu(file, $event)">
                <div class="fm-item-icon">
                    <template v-if="thisImage(file.extension)">
                        <img class="img-thumbnail"
                             v-bind:alt="file.filename"
                             v-bind:src="createImgUrl(file.path)">
                    </template>
                    <template v-else>
                        <i class="far fa-5x pb-2"
                           v-bind:class="extensionToIcon(file.extension)"></i>
                    </template>
                </div>
                <div class="fm-item-info">
                    {{ `${file.filename}.${file.extension}` }}
                    <br>
                    {{ bytesToHuman(file.size) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helper from './../../mixins/helper';
import manager from './../../mixins/manager';

export default {
  name: 'grid-view',
  mixins: [helper, manager],
  data() {
    return {
      disk: '',
    };
  },
  props: {
    manager: { type: String, required: true },
  },
  mounted() {
    this.disk = this.selectedDisk;
  },
  beforeUpdate() {
    // if disk changed
    if (this.disk !== this.selectedDisk) {
      this.disk = this.selectedDisk;
    }
  },
  methods: {
    /**
     * Check file extension (image or no)
     * @param extension
     * @returns {*|boolean}
     */
    thisImage(extension) {
      // extension not found
      if (!extension) return false;

      const img = ['png', 'jpg', 'jpeg', 'gif'];

      return img.includes(extension.toLowerCase());
    },

    /**
     * Create url for image
     * @param path
     * @returns {string}
     */
    createImgUrl(path) {
      return `${location.protocol}//${location.hostname}/file-manager/thumbnails?disk=${this.disk}&path=${path}`;
    },
  },
};
</script>

<style lang="scss">
    .fm-grid {
        padding-top: 1rem;

        .fm-grid-item {
            position: relative;
            width: 125px;
            padding: 0.4rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
            border-radius: 5px;

            &.active {
                background-color: #c2e5eb;
                box-shadow: 3px 2px 5px gray;
            }

            &:not(.active):hover {
                background-color: #f8f9fa;
                box-shadow: 3px 2px 5px gray;
            }

            .fm-item-icon{
                cursor: pointer;
            }

            .fm-item-icon > i {
                color: #6d757d;
            }

            .fm-item-info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
