<template>
<!-- container div -->
<div>
  <!-- content div -->
  <div class="w3-container w3-light-grey w3-display-middle shadow">
    <!-- header -->
    <h1 class="w3-center">Main Editor</h1>
    <em>All information will NEVER trace back to you, there is no privacy policy and nothing can be deleted.</em>
    <br>
    <br>
    <!-- end header -->

    <!-- main editor -->
    <input type="text" class="w3-input" v-model="title" placeholder="Insert title here..." />
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" :content="content">
    </quill-editor>
    <!-- end editor -->

    <!-- save button and error message -->
    <br>
    <button class="savebutton w3-button w3-green" style="display: block; margin: 0 auto;" v-on:click="onSave">Create</button>
    <p style="w3-red">{{ error }}</p>
    <!-- end save/error -->
  </div>
  <!-- end content -->
</div>
<!-- end container div -->
</template>

<script>
import {
    quillEditor,
} from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
import articleInfo from '@/../../truffle/build/contracts/Article';

export default {
    name: 'Editor',
    data () {
        return {
            editorOption: {},
            content: '',
            title: '',
            web3: this.$store.state.web3,
            error: '',
        };
    },
    methods: {
        onSave () {
            const web3Instance = this._data.web3.web3Instance();
            this._data.web3.bzz.upload(this._data.content)
                .then((hash) => {
                    const Article = new web3Instance.eth.Contract(articleInfo.abi);
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
                                web3Instance.eth.getGasPrice((err, gasPrice) => {
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
                                                    this.$router.push('/view/' + newContractInstance._address);
                                                }).catch((err) => {
                                                    this._data.error = err.toString();
                                                });
                                            }
                                        ).catch((err) => {
                                            console.log('error:', err);
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
