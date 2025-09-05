import { Page } from '@/components/Page'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

const pagesHaijun = () => {
  // 播放跳转
  const handlePlay = (id: number) => {
    Taro.navigateTo({ url: `/pages/video/index?id=${id}` })
  }

  // 回放跳转
  const handleRecord = (id: number) => {
    Taro.navigateTo({ url: `/pages/record/index?id=${id}` })
  }

  // 视频列表
  const videos = [
    { id: 1, name: '视频1' },
    { id: 2, name: '视频2' },
    { id: 3, name: '视频3' }
  ]

  return (
    <Page>
      <View style={{ padding: '20px' }}>
        {videos.map((video) => (
          <View
            key={video.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              gap: '10px'
            }}
          >
            <AtButton
              type="primary"
              circle
              customStyle={{ flex: 1 }}
              onClick={() => handlePlay(video.id)}
            >
              {video.name}
            </AtButton>

            <AtButton
              type="secondary"
              circle
              customStyle={{ flex: 1 }}
              onClick={() => handleRecord(video.id)}
            >
              {video.name}回放
            </AtButton>
          </View>
        ))}
      </View>
    </Page>
  )
}

export default pagesHaijun
