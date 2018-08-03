<template>
    <div v-if="web3.isInjected">
        <h2>{{ article.title }}</h2>
        <div v-html="article.body"></div>
    </div>
</template>

<script>
import articleInfo from '@/../../truffle/build/contracts/Article';

export default {
    name: 'ArticleView',
    data () {
        return {
            article: {
                title: '',
                body: 'Loading...',
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
                    return contract.methods.title().call()
                        .then((title) => {
                            this._data.article = {
                                title,
                                body: Buffer.from(body).toString('utf8'),
                            };
                        });
                });
        },
    },
};
</script>
