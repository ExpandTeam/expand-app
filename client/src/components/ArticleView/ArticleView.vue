<template>
    <div v-if="web3.isInjected">
        <div style="border: 1px solid">
            <h2>{{ article.title }}</h2>
            <p>by {{ article.author }}</p>
            <div v-html="article.body"></div>
        </div>
        <h4>E: {{ article.eAmount }}</h4>
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
                    ];
                    return Promise.all(infoPromises)
                        .then((results) => {
                            const title = results[0];
                            let author = results[1];
                            console.log(author);
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
                                        eAmount: 2,
                                    };
                                });
                        });
                });
        },
    },
};
</script>
