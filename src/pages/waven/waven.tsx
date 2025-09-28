import { View } from '@tarojs/components'
import './Waven.scss'

interface WavePatternProps {
  height?: number // 波浪高度
  color?: string // 波浪颜色
  animated?: boolean // 是否开启动画
  direction?: 'up' | 'down' // 波浪方向
  waveType?: 'smooth' | 'sharp' | 'double' // 波浪类型
}

const WavePattern = ({
  height = 60,
  color = '#ffffff',
  animated = true,
  direction = 'up',
  waveType = 'smooth'
}: WavePatternProps) => {
  
  const getSVGPath = () => {
    const paths = {
      smooth: direction === 'up' 
        ? "M0,60 C150,0 350,0 500,60 C650,120 850,120 1000,60 L1000,60 L0,60 Z"
        : "M0,0 C150,60 350,60 500,0 C650,-60 850,-60 1000,0 L1000,60 L0,60 Z",
      sharp: direction === 'up'
        ? "M0,60 L250,0 L500,60 L750,0 L1000,60 L1000,60 L0,60 Z"
        : "M0,0 L250,60 L500,0 L750,60 L1000,0 L1000,60 L0,60 Z",
      double: direction === 'up'
        ? "M0,60 C100,20 200,20 300,60 C400,100 500,100 600,60 C700,20 800,20 900,60 C950,80 1000,80 1000,60 L1000,60 L0,60 Z"
        : "M0,0 C100,40 200,40 300,0 C400,-40 500,-40 600,0 C700,40 800,40 900,0 C950,-20 1000,-20 1000,0 L1000,60 L0,60 Z"
    }
    return paths[waveType]
  }

  return (
    <View 
      className={`wave-pattern ${animated ? 'animated' : ''} ${direction}`}
      style={{
        '--wave-height': `${height}px`,
        '--wave-color': color
      } as any}
    >
      <View className="wave-svg-container">
        <svg
          className="wave-svg"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <path
            d={getSVGPath()}
            fill={color}
          />
        </svg>
      </View>
      
      {/* 添加装饰元素 */}
      {animated && (
        <View className="wave-decorations">
          <View className="bubble bubble1"></View>
          <View className="bubble bubble2"></View>
          <View className="bubble bubble3"></View>
          <View className="sparkle sparkle1">✨</View>
          <View className="sparkle sparkle2">💧</View>
        </View>
      )}
    </View>
  )
}

export default WavePattern