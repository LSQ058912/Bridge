import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './FlyingBird.scss'

interface FlyingBirdProps {
  duration?: number // 动画持续时间（秒）
  delay?: number // 延迟开始时间（秒）
  size?: number // 小人的大小
}

const FlyingBird = ({ duration = 8, delay = 0, size = 50 }: FlyingBirdProps) => {
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
      <View className="cartoon-person">
        <View className="person-head">
          <View className="face-eyes"></View>
          <View className="face-mouth"></View>
        </View>
        <View className="person-body"></View>
        <View className="person-arms">
          <View className="arm arm-left"></View>
          <View className="arm arm-right"></View>
        </View>
        <View className="person-legs">
          <View className="leg leg-left"></View>
          <View className="leg leg-right"></View>
        </View>
      </View>
    </View>
  )
}

export default FlyingBird