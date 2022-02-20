<template>
    <div class="fm-additions-cropper">
        <div class="row" v-bind:style="{ 'max-height': maxHeight + 'px' }">
            <div class="col-sm-9 cropper-block">
                <img v-bind:src="imgSrc" ref="fmCropper" v-bind:alt="selectedItem.basename" />
            </div>
            <div class="col-sm-3 ps-0">
                <div class="cropper-preview"></div>
                <div class="cropper-data">
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataX">X</label>
                        <input v-model.number="x" type="text" class="form-control" id="dataX" />
                        <span class="input-group-text">px</span>
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataY">Y</label>
                        <input v-model.number="y" type="text" class="form-control" id="dataY" />
                        <span class="input-group-text">px</span>
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataWidth">Width</label>
                        <input v-model.number="width" type="text" class="form-control" id="dataWidth" />
                        <span class="input-group-text">px</span>
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataHeight">Height</label>
                        <input v-model.number="height" type="text" class="form-control" id="dataHeight" />
                        <span class="input-group-text">px</span>
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataRotate">Rotate</label>
                        <input v-model.number="rotate" type="text" class="form-control" id="dataRotate" />
                        <span class="input-group-text">deg</span>
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataScaleX">ScaleX</label>
                        <input v-model.number="scaleX" type="text" class="form-control" id="dataScaleX" />
                    </div>
                    <div class="input-group input-group-sm">
                        <label class="input-group-text" for="dataScaleY">ScaleY</label>
                        <input v-model.number="scaleY" type="text" class="form-control" id="dataScaleY" />
                    </div>
                    <div class="d-grid gap-2">
                        <button
                            v-on:click="setData()"
                            v-bind:title="lang.modal.cropper.apply"
                            type="button"
                            class="btn btn-block btn-sm btn-info mb-2"
                        >
                            <i class="bi bi-check-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <div class="btn-group me-2" role="group" aria-label="Scale">
                    <button v-on:click="cropMove(-10, 0)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-left"></i>
                    </button>
                    <button v-on:click="cropMove(10, 0)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-right"></i>
                    </button>
                    <button v-on:click="cropMove(0, -10)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-up"></i>
                    </button>
                    <button v-on:click="cropMove(0, 10)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-down"></i>
                    </button>
                </div>
                <div class="btn-group me-2" role="group" aria-label="Scale">
                    <button v-on:click="cropScaleX()" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-left-right"></i>
                    </button>
                    <button v-on:click="cropScaleY()" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-down-up"></i>
                    </button>
                </div>
                <div class="btn-group me-2" role="group" aria-label="Rotate">
                    <button v-on:click="cropRotate(-45)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-counterclockwise"></i>
                    </button>
                    <button v-on:click="cropRotate(45)" type="button" class="btn btn-info">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                </div>
                <div class="btn-group me-2" role="group" aria-label="Rotate">
                    <button v-on:click="cropZoom(0.1)" type="button" class="btn btn-info">
                        <i class="bi bi-plus-circle"></i>
                    </button>
                    <button v-on:click="cropZoom(-0.1)" type="button" class="btn btn-info">
                        <i class="bi bi-dash-circle"></i>
                    </button>
                </div>
                <button
                    v-on:click="cropReset()"
                    v-bind:title="lang.modal.cropper.reset"
                    type="button"
                    class="btn btn-info me-2"
                >
                    <i class="bi bi-arrow-repeat"></i>
                </button>
                <button
                    v-on:click="cropSave()"
                    v-bind:title="lang.modal.cropper.save"
                    type="button"
                    class="btn btn-danger me-2"
                >
                    <i class="bi bi-save"></i>
                </button>
            </div>
            <span class="d-block">
                <button v-on:click="$emit('closeCropper')" type="button" class="btn btn-light">
                    {{ lang.btn.back }}
                </button>
            </span>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs';
import translate from '../../../mixins/translate';

export default {
    name: 'CropperModule',
    mixins: [translate],
    props: {
        imgSrc: { required: true },
        maxHeight: { type: Number, required: true },
    },
    data() {
        return {
            cropper: {},
            height: 0,
            width: 0,
            x: 0,
            y: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        };
    },
    mounted() {
        // set cropper instance
        this.cropper = new Cropper(this.$refs.fmCropper, {
            preview: '.cropper-preview',
            crop: (e) => {
                this.x = Math.round(e.detail.x);
                this.y = Math.round(e.detail.y);
                this.height = Math.round(e.detail.height);
                this.width = Math.round(e.detail.width);
                this.rotate = typeof e.detail.rotate !== 'undefined' ? e.detail.rotate : '';
                this.scaleX = typeof e.detail.scaleX !== 'undefined' ? e.detail.scaleX : '';
                this.scaleY = typeof e.detail.scaleY !== 'undefined' ? e.detail.scaleY : '';
            },
        });
    },
    beforeDestroy() {
        this.cropper.destroy();
    },
    computed: {
        /**
         * Selected file
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters['fm/selectedItems'][0];
        },
    },
    methods: {
        /**
         * Move
         * @param x
         * @param y
         */
        cropMove(x, y) {
            this.cropper.move(x, y);
        },

        /**
         * Scale - mirroring Y
         */
        cropScaleY() {
            this.cropper.scale(1, this.cropper.getData().scaleY === 1 ? -1 : 1);
        },

        /**
         * Scale - mirroring X
         */
        cropScaleX() {
            this.cropper.scale(this.cropper.getData().scaleX === 1 ? -1 : 1, 1);
        },

        /**
         * Rotate
         * @param grade
         */
        cropRotate(grade) {
            this.cropper.rotate(grade);
        },

        /**
         * Zoom
         * @param ratio
         */
        cropZoom(ratio) {
            this.cropper.zoom(ratio);
        },

        /**
         * Reset
         */
        cropReset() {
            this.cropper.reset();
        },

        /**
         * Set data from form
         */
        setData() {
            this.cropper.setData({
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotate: this.rotate,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
            });
        },

        /**
         * Save cropped image
         */
        cropSave() {
            this.cropper.getCroppedCanvas().toBlob(
                (blob) => {
                    const formData = new FormData();
                    // add disk name
                    formData.append('disk', this.$store.getters['fm/selectedDisk']);
                    // add path
                    formData.append('path', this.selectedItem.dirname);
                    // new image
                    formData.append('file', blob, this.selectedItem.basename);

                    this.$store.dispatch('fm/updateFile', formData).then((response) => {
                        // if file updated successfully
                        if (response.data.result.status === 'success') {
                            // close cropper
                            this.$emit('closeCropper');
                        }
                    });
                },
                this.selectedItem.extension !== 'jpg' ? `image/${this.selectedItem.extension}` : 'image/jpeg'
            );
        },
    },
};
</script>

<style lang="scss">
@import 'cropperjs/dist/cropper.css';

.fm-additions-cropper {
    overflow: hidden;

    button > i {
        color: white;
        font-weight: bold;
    }

    & > .row {
        flex-wrap: nowrap;
    }

    .cropper-block {
        overflow: hidden;

        img {
            max-width: 100%;
        }
    }

    .col-sm-3 {
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .cropper-preview {
        margin-bottom: 1rem;
        overflow: hidden;
        height: 200px;

        img {
            max-width: 100%;
        }
    }

    .cropper-data {
        padding-left: 1rem;
        padding-right: 1rem;

        & > .input-group {
            margin-bottom: 0.5rem;
        }

        .input-group > .input-group-text:first-child {
            min-width: 4rem;
        }

        .input-group > .input-group-text:last-child {
            min-width: 3rem;
        }
    }

    & > .d-flex {
        padding: 1rem;
        border-top: 1px solid #e9ecef;
    }
}
</style>
