import { Page } from '@/components/Page'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

const pagesHaijun = () => {
    const handlePlay_view1 = () => {
        Taro.navigateTo({ url: "/pages/video/index?id=1"});
    }
    const handlePlay_view2 = () => {
        Taro.navigateTo({ url: "/pages/video/index?id=2" });
    }
    const handlePlay_view3 = () => {
        Taro.navigateTo({ url: "/pages/video/index?id=3" });
    }
    
  return (
    <Page>
        <View style={{ marginTop: "20px", display: "flex", justifyContent: "center", width: "100%" }}>
        <AtButton type='primary' style={{width:"100%"}} onClick={() => {handlePlay_view1()}}>视频1</AtButton>
        </View>
        <View style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <AtButton type='primary' onClick={() => {handlePlay_view2()}}>视频2</AtButton>
        </View> 
        <View style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <AtButton type='primary' onClick={() => {handlePlay_view3()}}>视频3</AtButton>
        </View>
    </Page>
    
  )
}

export default pagesHaijun