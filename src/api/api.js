import url from "./url";
import axios from  'axios'

//获取轮播图
export function getBanner() {
    return axios(url.bannerUrl);
}

//获取推荐歌单
export function getRecommendSongList() {
    return axios(url.recommendSongListUrl);
}

//获取推荐歌曲
export function getRecommendSong() {
    return axios(url.recommendSongUrl);
}
