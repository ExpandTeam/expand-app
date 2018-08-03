<template>
    <div>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      :content="content">
        </quill-editor>
        <button class="cancelbutton" v-on:click="onCancel">Cancel</button>
        <button class="savebutton" v-on:click="onSave">Save</button>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
export default {
    data () {
        return {
            name: 'Editor',
            editorOption: {},
            content: 'hey',
        };
    },
    methods: {
        onSave () {
            // var _this = this.onEditorChange;
            console.log(this._data.content);
            // console.log(this);
            // console.log(this.data.content);
        },
        onCancel: () => {
            console.log('cancel');
        },
    },
    components: {
        quillEditor,
    },

};
</script>

<style>

</style>
