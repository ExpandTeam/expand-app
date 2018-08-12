<template>
    <div class="w3-light-grey w3-center" v-if="status === 2 || status === 1" style="padding: 2rem;">
      <h1 class="w3-red">You are not logged in.</h1>
      <p>You will not be able to post or view your profile unless you install/login to Metamask.</p>
      <hr class="w3-border-grey">
      <h1>Installing Metamask</h1>
      <ul class="w3-ul">
        <li><i class="fab fa-chrome"></i> Install Google Chrome, Firefox, Opera or other Chromium-based browser</li>
        <li><i class="fa fa-edit"></i> Install and setup the <a href="https://metamask.io">Metamask extension.</a></li>
        <li><i class="fa fa-thumbs-up"></i> Once Metamask setup is complete, you will be able to view and edit your profile.</li>
      </ul>
      <hr class="w3-border-grey">
      <h1>Other Information</h1>
      <p>
          What does this mean? <b>You cannot post or tip articles, only view them. You also have no profile.</b>
          <br>
          Will I lose my anonmyity when I use Metamask? <b>No. Using Metamask will allow you to post articles and create a completely anonymous profile.</b>
      </p>
  </div>
  <div v-else class="w3-container w3-light-grey w3-display-middle" style="box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); padding: 20px;">
    <h1 class="w3-center">Main Editor</h1>
    <em>All information will NEVER trace back to you, there is no privacy policy and nothing can be deleted.</em>
    <br>
    <br>
      <input type="text" class="w3-input" v-model="title" placeholder="Insert title here..." />
      <quill-editor ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
                    :content="content">
      </quill-editor>
      <!--
          <button class="cancelbutton" v-on:click="onCancel">Cancel</button>
      -->
      <br>
      <button class="savebutton w3-button w3-green" style="display: block; margin: 0 auto;" v-on:click="onSave">Create</button>
      <p style="w3-red">{{ error }}</p>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
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
    computed: {
        status () {
            // status codes:
            // 0 - fatal error, no web3 injection available - metamask does not exist
            // 1 - warning, not connected to ropsten,
            // 2 - no warning, running anonymously
            // 3 - all is well
            var web3 = this.$store.state.web3;
            if (!web3.isInjected) {
                return 0;
            } else if (web3.networkId !== 'ropsten') {
                return 1;
            } else if (web3.anonymous) {
                return 2;
            } else {
                return 3;
            }
        },
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
                                                    console.log('im feeling dense');
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
