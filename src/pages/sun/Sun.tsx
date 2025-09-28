import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './CartoonSun.scss'

interface CartoonSunProps {
  size?: number // 太阳大小
  position?: 'top-left' | 'top-right' | 'center' | 'custom' // 预设位置
  top?: string // 自定义top位置
  left?: string // 自定义left位置
  right?: string // 自定义right位置
  animated?: boolean // 是否开启动画
  showFace?: boolean // 是否显示表情
}

const CartoonSun = ({ 
  size = 80, 
  position = 'top-right',
  top,
  left,
  right,
  animated = true,
  showFace = true 
}: CartoonSunProps) => {
  
  const getPositionStyle = () => {
    if (position === 'custom') {
      return {
        top: top || '20px',
        left: left,
        right: right || (left ? undefined : '20px')
      }
    }
    
    const positions = {
      'top-left': { top: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'center': { 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)' 
      }
    }
    
    return positions[position]
  }

  return (
    <View 
      className={`cartoon-sun ${animated ? 'animated' : ''}`}
      style={{
        '--sun-size': `${size}px`,
        ...getPositionStyle()
      } as any}
    >
      {/* 太阳光芒 */}
      <View className="sun-rays">
  {Array.from({ length: 10 }).map((_, index) => (
    <View 
      key={index} 
      className="ray" 
      style={{
        transform: `rotate(${index * 36}deg)` // 360 ÷ 10 = 36度
      }}
    />
  ))}
</View>
      
      {/* 太阳主体 */}
      <View className="sun-body">
        {showFace && (
          <View className="sun-face">
            {/* 眼睛 */}
            <View className="eyes">
              <View className="eye eye-left"></View>
              <View className="eye eye-right"></View>
            </View>
            {/* 嘴巴 */}
            <View className="mouth"></View>
            {/* 脸颊 */}
            <View className="cheek cheek-left"></View>
            <View className="cheek cheek-right"></View>
          </View>
        )}
      </View>
    </View>
  )
}

export default CartoonSun
