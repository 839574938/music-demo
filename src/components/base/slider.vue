<template>
    <div class="slide-banner">
        <div class="banner-wrapper">
            <div class="slide-banner-scroll" ref="slide">
                <div class="slide-banner-wrapper" ref="sliderGroup">
                    <slot></slot>
                </div>
            </div>
            <div class="docs-wrapper">
                <span
                        class="doc"
                        v-for="(item, index) in dots"
                        :key="index"
                        :class="{'active': currentPageIndex === index}"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {addClass} from '../../common/js/dom'
    import BScroll from '@better-scroll/core'
    import Slide from '@better-scroll/slide'

    BScroll.use(Slide);

    export default {
        name: "slider",
        props: {
            //循环轮播
            loop: {//默认不循环
                type: Boolean,
                default: true
            },
            //自动轮播
            autoPlay: {
                type: Boolean,
                default: true
            },
            //自动轮播的时间参数
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0,
                playTimer: 0,
                slide: null,
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth(false);
                this._initDots();
                this.init()

                if (this.autoPlay) {
                    this.autoGoNext()
                }
            }, 21);

            window.addEventListener('resize', () => {
                if (!this.slider) {
                    return;
                }
                this._setSliderWidth(true);
                this.slider.refresh();
            })

        },
        beforeDestroy() {
            clearTimeout(this.playTimer);
            this.slide.destroy()
        },
        methods: {
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slide.clientWidth;
                if(this.children.length == 0) {
                    return;
                }
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');//设置对应好的样式名称,方便样式的装饰灯\等
                    child.style.width = sliderWidth + 'px';//设置每张图片的宽度
                    width += sliderWidth;//总宽度等于单个图片的宽度*个数
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }

                this.$refs.sliderGroup.style.width = width + 'px'

            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            init() {
                clearTimeout(this.playTimer);
                this.slide = new BScroll(this.$refs.slide, {
                    scrollX: true,
                    scrollY: false,
                    slide: {
                        loop: this.loop,
                        threshold: 100
                    },
                    useTransition: true,
                    momentum: false,
                    bounce: false,
                    stopPropagation: true,
                    probeType: 2
                });
                this.slide.on('scrollEnd', this._onScrollEnd);

                // user touches the slide area
                this.slide.on('beforeScrollStart', () => {
                    clearTimeout(this.playTimer)
                });
                // user touched the slide done
                this.slide.on('scrollEnd', () => {
                    this.autoGoNext()
                });
                this.slide.on('slideWillChange', (page) => {
                    this.currentPageIndex = page.pageX
                });
                this.autoGoNext()
            },
            nextPage() {
                this.slide.next()
            },
            prePage() {
                this.slide.prev()
            },
            _onScrollEnd() {
                this.autoGoNext()
            },
            autoGoNext() {
                clearTimeout(this.playTimer);
                this.playTimer = setTimeout(() => {
                    this.nextPage()
                }, this.interval)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/variable.styl"

    .slide-banner
        padding 10px
        padding-bottom 30px
        background $color-background-header

        .banner-wrapper
            position relative
            overflow hidden
            border-radius 10px

        .slide-banner-scroll
            min-height 1px
            overflow hidden

        .slide-banner-wrapper
            white-space nowrap
            font-size 0

            .slide-item
                display inline-block
                width 100%
                text-align center

                img
                    width: 100%;

        .docs-wrapper
            position absolute
            bottom 15px
            left 50%
            transform translateX(-50%)

            .doc
                display inline-block
                margin 0 4px
                width 8px
                height 8px
                border-radius 50%
                background #eee

                &.active
                    width 20px
                    border-radius 5px

        .btn-wrap
            margin-top 20px
            display flex
            justify-content center

            button
                margin 0 10px
                padding 10px
                color #fff
                border-radius 4px
                background-color #666

</style>
