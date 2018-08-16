<template>
<!-- container header -->
<div v-if="web3.isInjected">
  <!-- header -->
  <div class="w3-row w3-container w3-light-grey w3-center">
    <h1 class="w3-xxxlarge">{{ article.title }}</h1>
    <h2 style="margin-top:0px;">by {{ article.author }}</h2>
  </div>
  <!-- end header -->

  <!-- body -->
  <div class="w3-row w3-green w3-center">
    <div v-html="article.body" class="w3-border w3-round" style="padding: 2em;"></div>
    <br>
    <button disabled v-on:click="giveExpand()" class="w3-button w3-light-grey">Cannot tip E ({{ article.eAmount }})</button>
    <br><br>
  </div>
  <!-- end body -->
</div>
<!-- container end -->
</template>

<script>
import articleInfo from '@/../../truffle/build/contracts/Article';
import expandTokenInfo from '@/../../truffle/build/contracts/ExpandToken';

export default {
    name: 'ArticleView',
    data () {
        return {
            article: {
                title: '',
                body: 'Loading...',
                eAmount: '...',
            },
        };
    },
    computed: {
        web3 () {
            if (this.$store.state.web3.isInjected) {
                this.updateArticle();
            }
            return this.$store.state.web3;
        },
    },
    watch: {
        '$route' (to, from) {
            if (this.web3.isInjected) {
                this.updateArticle();
            }
        },
    },
    methods: {
        giveExpand () {
            const web3Instance = this.web3.web3Instance();
            const expandTokenContract = new web3Instance.eth.Contract(expandTokenInfo.abi, process.env.EXPAND_CONTRACT_ADDRESS);
            const articleContract = new web3Instance.eth.Contract(articleInfo.abi, this.$route.params.address);

            articleContract.methods.owner().call().then((author) => {
                expandTokenContract.methods.approve(author, Math.pow(10, 18))
                    .send({
                        from: this.web3.coinbase,
                    })
                    .then((res) => {
                        articleContract.methods.give(Math.pow(10, 18), process.env.EXPAND_CONTRACT_ADDRESS)
                            .send({
                                from: this.web3.coinbase,
                            })
                            .then((res) => {
                                console.log(res);
                            }).catch((err) => {
                                console.error(err);
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            });
        },
        updateArticle () {
            const web3 = this.$store.state.web3;
            const web3Instance = web3.web3Instance();
            const address = this.$route.params.address;
            const contract = new web3Instance.eth.Contract(articleInfo.abi, address);
            contract.methods.hash().call()
                .then((hash) => {
                    return web3.bzz.download(hash);
                })
                .then((body) => {
                    const infoPromises = [
                        contract.methods.title().call(),
                        contract.methods.owner().call(),
                        contract.methods.amount().call(),
                    ];
                    return Promise.all(infoPromises)
                        .then((results) => {
                            const title = results[0];
                            let author = results[1];
                            const amount = results[2];
                            return fetch(process.env.ROOT_API + '/user?address=' + author)
                                .then((user) => {
                                    return user.json();
                                })
                                .then((user) => {
                                    if (user) {
                                        author = user.username;
                                    }
                                    this._data.article = {
                                        title,
                                        author,
                                        body: Buffer.from(body).toString('utf8'),
                                        eAmount: amount,
                                    };
                                });
                        });
                });
        },
    },
};
</script>
