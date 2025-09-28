import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './FlyingBird.scss'

interface FlyingBirdProps {
  duration?: number // 动画持续时间（秒）
  delay?: number // 延迟开始时间（秒）
  size?: number // 鸟的大小
}

const FlyingBird = ({ duration = 8, delay = 0, size = 30 }: FlyingBirdProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <View 
      className={`flying-bird ${isVisible ? 'flying' : ''}`}
      style={{
        '--duration': `${duration}s`,
        '--size': `${size}px`
      } as any}
    >
      <View className="bird">
        <View className="wing wing-left"></View>
        <View className="wing wing-right"></View>
        <View className="body"></View>
      </View>
    </View>
  )
}

export default FlyingBird