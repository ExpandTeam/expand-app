<template>
    <div v-if="article">
        <h2>{{ article.title }}</h2>
        <div v-html="article.body"></div>
    </div>
</template>

<script>
import articleInfo from '@/../../truffle/build/contracts/Article';

export default {
    name: 'ArticleView',
    asyncComputed: {
        async article () {
            const web3 = this.$store.state.web3;
            if (!web3.isInjected) {
                return {
                    title: '',
                    body: 'Waiting for web3...',
                };
            }
            const web3Instance = web3.web3Instance();
            const address = this.$route.params.address;
            const contract = new web3Instance.eth.Contract(articleInfo.abi, address);
            return contract.methods.hash().call()
                .then((hash) => {
                    return web3.bzz.download(hash);
                })
                .then((body) => {
                    return contract.methods.title().call()
                        .then((title) => {
                            return {
                                title,
                                body: Buffer.from(body).toString('utf8'),
                            };
                        });
                });
        },
    },
};
</script>
