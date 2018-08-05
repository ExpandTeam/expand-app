<template>
    <div v-if="web3.isInjected" class="w3-display-middle w3-container w3-light-grey w3-center" style="padding: 10px;">
            <h2>{{ article.title }}</h2>
            <p>by {{ article.author }}</p>
            <div v-html="article.body"></div>
        <h4>E: {{ article.eAmount }}</h4>
        <button disabled v-on:click="giveExpand()">Give 1 ExpandCoin (soon)</button>
    </div>
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
                    .send({ from: this.web3.coinbase })
                    .then((res) => {
                        articleContract.methods.give(Math.pow(10, 18), process.env.EXPAND_CONTRACT_ADDRESS)
                            .send({ from: this.web3.coinbase })
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
