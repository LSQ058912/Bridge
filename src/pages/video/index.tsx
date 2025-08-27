import { View } from '@tarojs/components'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Taro, { useLoad } from '@tarojs/taro'

// 全局错误处理
const handleGlobalError = (error) => {
  console.error('全局错误捕获:', error)
  return true // 阻止错误继续传播
}

// 监听未处理的Promise错误
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的Promise错误:', event.reason)
    event.preventDefault() // 阻止默认错误处理
  })
}

function Index() {
  const [channelNo, setChannelNo] = useState<number>(0)

  const playerConfig = useMemo(() => {
    return {
      accessToken: "at.50wn6qz6a81d0msa94oeq84c5xbdmcqz-7eh450cj5v-05shb3d-jexqoad4x",
      url: `rtmp://open.ys7.com/AD0412332/${channelNo}/live`,
      deviceSerial: "AD0412332", // 从URL中提取的设备序列号
      channelNo: channelNo,
      verifyCode: "haijunjunyi1" // 如果设备有验证码，在这里设置
    }
  }, [channelNo])


  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 主题配置对象
  const themeConfig = {
    showFullScreenBtn: true,
    showHdBtn: true,
    showTimeLine: true
  }

  // 错误处理函数 - 添加更完善的错误捕获
  const handleError = useCallback(async (errorInfo) => {
    try {
      console.error('萤石播放器错误:', errorInfo)
      setError(errorInfo)

      // 根据不同错误类型显示不同提示
      let errorMsg = '播放失败'
      if (errorInfo && typeof errorInfo === 'string') {
        if (errorInfo.includes('60019') || errorInfo.includes('验证码')) {
          errorMsg = '设备验证码错误，请检查验证码设置'
        } else if (errorInfo.includes('20018')) {
          errorMsg = '无设备权限，请检查设备绑定状态'
        } else if (errorInfo.includes('网络')) {
          errorMsg = '网络连接失败，请检查网络'
        }
      }

      await Taro.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 3000
      })
    } catch (err) {
      console.error('处理错误时发生异常:', err)
    }
  }, [])

  // 控制事件处理函数 - 添加try-catch包装
  const onControlEvent = async (eventInfo: any) => {
    try {
      console.log('播放器控制事件:', eventInfo)

      // 处理不同的控制事件
      switch (eventInfo?.type) {
        case 'play':
          console.log('开始播放')
          setIsLoading(false)
          break
        case 'pause':
          console.log('暂停播放')
          break
        case 'error':
          await handleError(eventInfo?.message || '播放器错误')
          break
        case 'loading':
          setIsLoading(true)
          break
        case 'loaded':
          setIsLoading(false)
          break
        default:
          break
      }
    } catch (error) {
      console.error('处理控制事件时出错:', error)
    }
  }

  // 刷新播放器 - 添加错误处理
  const refreshPlayer = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true)

      // 这里可以重新获取token或刷新播放地址
      // 如果需要重新获取accessToken
      // const token = await getNewAccessToken()
      // setPlayerConfig(prev => ({
      //   ...prev,
      //   accessToken: token
      // }))

      console.log('播放器刷新完成')
    } catch (error) {
      console.error('刷新播放器失败:', error)
      setError('刷新失败')
      setIsLoading(false)
    }
  }, [])

  // 组件挂载时的初始化 - 添加错误边界
  useEffect(() => {
    const initPlayer = async () => {
      try {
        console.log('萤石播放器初始化')
        setIsLoading(true)

        // 可以在这里进行一些初始化操作
        // 比如检查网络状态、验证token等

        // 模拟异步操作完成
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)

      } catch (error) {
        console.error('初始化播放器失败:', error)
        setError('初始化失败')
        setIsLoading(false)
      }
    }

    initPlayer().catch(error => {
      console.error('播放器初始化异常:', error)
    })

    return () => {
      console.log('萤石播放器销毁')
    }
  }, [])

  useLoad((options) => {
    const { id } = options
    setChannelNo(id)
  })

  return (
    <View style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: '#000'
    }}>
      {/* 萤石播放器 - 添加错误边界处理 */}
      <View
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* <ezplayer 
            id="ezplayer"
            accessToken={playerConfig.accessToken}
            url={playerConfig.url}
            validateCode={playerConfig.verifyCode}
            plugins="talk,voice,capture"
            recPlayTime=""
            width="360"
            height="300"
            watermark="shuiyin"
            theme="{{ { showFullScreenBtn: true, showHdBtn: true, showTimeLine: true } }}"
            onHandleError={handleError}
            onOnControlEvent={onControlEvent}
        /> */}
        {channelNo && <ezplayer
          id="ezplayer"
          accessToken={playerConfig.accessToken}
          url={playerConfig.url}
          // 如果需要使用ezopen协议
          // url={`ezopen://${playerConfig.accessToken}@open.ys7.com/${playerConfig.deviceSerial}/${playerConfig.channelNo}.live`}
          plugins="talk,voice,capture"
          recPlayTime=""
          width="100%"
          height="100%"
          watermark="Haijun"
          theme={JSON.stringify(themeConfig)} // 将对象转换为JSON字符串
          verifyCode={playerConfig.verifyCode} // 添加验证码参数
          onError={handleError} // 使用onError而不是handleError
          onControlEvent={onControlEvent}
          // 额外的配置参数
          autoplay={true}
          muted={false}
          controls={true}
        />}
      </View>

      {/* 加载状态 */}
      {isLoading && (
        <View style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          正在加载视频...
        </View>
      )}

      {/* 错误状态 */}
      {error && (
        <View style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          <View style={{ marginBottom: '15px' }}>播放出错</View>
          <View
            style={{
              backgroundColor: '#007aff',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={refreshPlayer}
          >
            重新播放
          </View>
        </View>
      )}
    </View>
  )
}

export default Index