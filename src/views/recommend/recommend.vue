<template>
    <div class="recommend">
        <div class="slider-wrap">
            <slider>
                <div class="slide-item" v-for="(item,index) in sliderRecommend" :key="item + index">
                    <img :src="item.pic" alt="">
                </div>
            </slider>
        </div>
        <div class="recommend-list">
            <h1 class="recommend-list-title">推荐歌单</h1>
            <ul>
                <li class="recommend-item" v-for="(item,index) in songListRecommend" :key="item + index">
                    <div class="recommend-item-top">
                        <div class="mask"></div>
                        <img class="recommend-item-img" :src="item.picUrl" alt="">
                        <span class="listen-number">{{ item.playCount | playCount }}</span>
                    </div>
                    <div class="recommend-item-bottom">
                        <div class="recommend-item-text">
                            {{ item.name }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="recommend-list">
            <h1 class="recommend-list-title">推荐歌曲</h1>
            <ul>
                <li class="recommend-item" v-for="(item,index) in songRecommend" :key="item + index">
                    <div class="recommend-item-top">
                        <div class="mask"></div>
                        <img class="recommend-item-img" :src="item.picUrl" alt="">
                    </div>
                    <div class="recommend-item-bottom">
                        <div class="recommend-item-text">
                            {{ item.name }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="loading-container" v-show="!songListRecommend.length || !songRecommend.length"><!-- 在获取 到数据之前加载 -->
            <loading></loading>
        </div>
    </div>
</template>

<script>
    import Slider from "../../components/base/slider";
    import {getBanner, getRecommendSong, getRecommendSongList} from "../../api/api";
    import Loading from "../../components/base/loading";

    export default {
        name: "recommend",
        components: {Loading, Slider},
        data() {
            return {
                sliderRecommend: [],
                songListRecommend: [],
                songRecommend: []
            }
        },
        beforeCreate() {
            //获取 Banner
            getBanner().then(res => {
                this.sliderRecommend = res.data.banners;
            });
            // 获取 歌曲列表
            getRecommendSongList().then(res => {
                this.songListRecommend = res.data.result;
            });
            //获取 推荐歌曲
            getRecommendSong().then(res => {
                this.songRecommend = res.data.result;
                this.songRecommend.pop();
            })
        },
        filters: {
            playCount(value) {
                return Math.floor(value / 10000) + "万";
            }
        }

    }
</script>

<style scoped lang="stylus">
    .recommend
        .recommend-list
            .recommend-list-title
                height 30px
                line-height 30px
                margin-left 10px
                margin-right 10px
                padding-top 10px
                padding-bottom 10px
                border-bottom 1px solid rgba(0, 0, 0, .3)

        .recommend-item
            width: 33.3%
            padding 0 1%
            box-sizing: border-box;
            display inline-block
            margin-bottom 1%

            .recommend-item-top
                position: relative

                .recommend-item-img
                    width: 100%

                .mask
                    position: absolute
                    top 0
                    width 100%
                    height 35px
                    background linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0))

                .listen-number
                    width: 100%;
                    color #fff
                    position: absolute;
                    top 0
                    right 0
                    z-index 2
                    text-align right
                    padding-top 5px
                    padding-right 5px
                    font-size 13px

            .recommend-item-bottom
                height 40px
                overflow hidden

                .recommend-item-text
                    font-size 14px
                    width: 100%;
                    line-height 20px
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
</style>
