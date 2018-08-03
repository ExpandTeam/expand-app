<template>
    <div>
        <input type="text" v-model="title" placeholder="Insert title here..." />
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      :content="content">
        </quill-editor>
        <!--
            <button class="cancelbutton" v-on:click="onCancel">Cancel</button>
        -->
        <button class="savebutton" v-on:click="onSave">Create</button>
        <p style="color: red">{{ error }}</p>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
import articleInfo from '@/../../truffle/build/contracts/Article';

export default {
    data () {
        return {
            name: 'Editor',
            editorOption: {},
            content: '',
            title: '',
            web3: this.$store.state.web3,
            web3Instance: this.$store.state.web3.web3Instance(),
            error: '',
        };
    },
    methods: {
        onSave () {
            this._data.web3.bzz.upload(this._data.content)
                .then((hash) => {
                    const Article = new this._data.web3Instance.eth.Contract(articleInfo.abi);
                    const contractArgs = [this._data.title, hash];
                    const deployedArticle = Article.deploy({
                        data: articleInfo.bytecode,
                        arguments: contractArgs,
                    });
                    deployedArticle.estimateGas(
                        (err, gas) => {
                            if (err) {
                                console.error(err);
                            } else {
                                this._data.web3Instance.eth.getGasPrice((err, gasPrice) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        deployedArticle.send({
                                            from: this._data.web3.coinbase,
                                            gas,
                                            gasPrice,
                                        }).then(
                                            (newContractInstance) => {
                                                this.$http.post(
                                                    process.env.ROOT_API + '/article/update', {
                                                        address: newContractInstance._address,
                                                    }, {
                                                        emulateJSON: true,
                                                    }
                                                ).then(() => {
                                                    console.log("yay");
                                                }).catch((err) => {
                                                    this._data.error = err.toString();
                                                });
                                            }
                                        ).catch((err) => {
                                            this._data.error = err.toString();
                                        });
                                    }
                                });
                            }
                        }
                    );
                });
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
