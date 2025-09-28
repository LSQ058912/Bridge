import { Page } from '@/components/Page'
import { View,Text } from '@tarojs/components'
import {Swiper,SwiperItem} from '@tarojs/components'
import Taro ,{Component} from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import FlyingBird from '@/pages/Flybirds/FlyBirds' // 导入飞鸟组件
import CartoonSun from '@/pages/sun/Sun' // 导入卡通太阳组件
const pagesDiandan = () => {
  return (
    <Page>
    <View 
  style={{ 
    width: '100%', 
    height: '170px', // 增加高度以容纳两个部分
    backgroundColor:'#3d2b12',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' // 垂直排列
  }}
>
  {/* 滚动框部分 */}
  <View style={{ 
    width: '100%', 
    height: '170px', // 滚动框高度
    backgroundColor: '#3d2b12',
  }}>
    <Swiper
      className='test-h'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      vertical
      circular
      indicatorDots
      autoplay
    >
      <SwiperItem>
        <View style={{ 
          width: '100%', 
          height: '170px', 
          backgroundColor: '#3d2b12',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{ color: '#fff', fontSize: '24px' }}>SHOP1</Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={{ 
          width: '100%', 
          height: '170px', 
          backgroundColor: '#3d2b12',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{ color: '#fff', fontSize: '24px' }}>SHOP2</Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={{ 
          width: '100%', 
          height: '170px', 
          backgroundColor: '#3d2b12',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{ color: '#fff', fontSize: '24px' }}>SHOP3</Text>
        </View>
      </SwiperItem>
    </Swiper>
  </View>

  {/* 装订圆环部分 */}
  <View style={{ 
    width: '100%', 
    height: '50px', 
    //backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    top: '145px',
    left: '0',
    zIndex:100
  }}>
    {/* 创建多个装订圆环 */}
    {Array.from({ length: 7 }).map((_, index) => (
      <View key={index} style={{
        position: 'absolute',
        left: `${ index * 15}%`,
        width: '40px',
        height: '40px',
        borderRadius: '70%',
        backgroundColor: 'transparent',
        //border: '4px solid #000',
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.3)',
        zIndex: 1000
      }} />
    ))}
    
    {/* 装订线效果 */}
    {/* <View style={{
      position: 'absolute',
      left: '15%',
      right: '15%',
      height: '2px',
      backgroundColor: '#ddd',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 0
    }} /> */}
  </View>

  {/* 飞鸟组件 - 绝对定位覆盖整个区域 */}
  <View style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' // 允许点击穿透
  }}>
    <FlyingBird duration={6} delay={0} size={25} />
    <FlyingBird duration={8} delay={3} size={20} />
    <FlyingBird duration={7} delay={6} size={30} />
  </View>
</View>
      <View style={{ width: '100%', height: '100px', backgroundColor: '#3d2b12',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3b2217',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3d2b12',borderRadius:'50%',marginTop:'90px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3b2217',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3d2b12',borderRadius:'50%',marginTop:'100px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3b2217',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#3d2b12',borderRadius:'50%',marginTop:'90px'}}></View>
      </View>
      
      <View style={{ width: '100%', height: '350px', backgroundColor: 'rgba(57,33,21,1)',backgroundImage:'url(' + require('@/assets/png/little.png') + ')',backgroundSize:'cover'}} >

        <View style={{ width: '100%', height: '100px',paddingTop:'285px' }}><AtButton  size="normal" circle customStyle={{ backgroundColor: 'transparent', border: 'none' }}>
            <Text style={{ fontSize: '24px', color: '#3d2b12',fontWeight:'bold',textShadow: '1px 1px 3px rgba(255, 255, 255, 0.8), -1px -1px 3px rgba(0, 0, 0, 0.2)' }}>开始点单</Text>
            </AtButton></View>
      </View>
    </Page>
  )
}

export default pagesDiandan