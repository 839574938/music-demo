<template>
    <div>
        <slider></slider>
    </div>
</template>

<script>
    import axios from 'axios';
    import Slider from "../../components/base/slider";

    export default {
        name: "recommend",
        components: {Slider},
        data() {
            return {
                msg: null
            }
        },
        created() {
            axios.get("http://localhost:3000/banner?type=1").then(res => {
                this.msg = res.data.banners;
            })
        }
    }
</script>

<style scoped>

</style>
