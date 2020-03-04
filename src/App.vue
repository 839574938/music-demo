<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import mHeader from "./components/header/header";
    import tab from "./components/tab/tab";

    export default {
        name: 'app',
        components: {
            "m-header": mHeader,
            tab
        }
    }
</script>

<style lang="stylus" scoped>
    @import "./common/stylus/variable.styl"

    #app
        color: $color-text

</style>

