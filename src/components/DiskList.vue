<template>
    <div class="fm-disk-list">
        <ul class="list-inline">
            <li class="list-inline-item" v-for="(disk, index) in disks" v-bind:key="index">
                <span class="badge"
                      v-on:click="selectDisk(disk)"
                      v-bind:class="[disk === selectedDisk ? 'badge-secondary' : 'badge-light']">
                    <i class="fa-fw far fa-hdd"></i> {{ disk }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'DiskList',
  props: {
    // manager name - left or right
    manager: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {
    // all disks
    disks() {
      return this.$store.state.fm.diskList;
    },

    // Selected Disk for this manager
    selectedDisk() {
      return this.$store.state.fm[this.manager].selectedDisk;
    },
  },
  methods: {
    /**
     * select disk
     * @param disk
     */
    selectDisk(disk) {
      if (this.selectedDisk !== disk) {
        this.$store.dispatch('fm/selectDisk', {
          disk,
          manager: this.manager,
        });
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-disk-list {

        ul.list-inline {
            margin-bottom: 0.5rem;
        }

        .badge.badge-light {
            cursor: pointer;
        }
    }
</style>
