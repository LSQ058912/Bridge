import { Page } from '@/components/Page'
import { View,Text } from '@tarojs/components'

import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import FlyingBird from '@/pages/Flybirds/FlyBirds' // 导入飞鸟组件
import CartoonSun from '@/pages/sun/Sun' // 导入卡通太阳组件
import Waven from '@/pages/waven/waven' // 导入波浪组件
const pagesDiandan = () => {
  return (
    <Page>
      <View 
        style={{ 
          width: '100%', 
          height: '300px', 
          backgroundColor: 'rgb(21, 121, 235)',
          backgroundImage: 'url(' + require('@/assets/png/blue.png') + ')',
          backgroundSize: 'cover',
          position: 'relative', // 添加相对定位以便飞鸟绝对定位
          overflow: 'hidden' // 隐藏超出边界的部分
        }}
      >
        {/* 添加多只飞鸟，不同的延迟和大小 */}
        <CartoonSun 
        size={60}
        position="custom"
        top="20px"
        left="50px"
        animated={true}
        showFace={true}
      />
        <FlyingBird duration={6} delay={0} size={25} />
        <FlyingBird duration={8} delay={3} size={20} />
        <FlyingBird duration={7} delay={6} size={30} />
      </View>
      <View style={{ width: '100%', height: '100px', backgroundColor: '#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#000',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#fff',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#000',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#fff',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#000',borderRadius:'50%',marginTop:'80px'}}></View>
      <View style={{ width: '65px', height: '100px', backgroundColor: '#fff',borderRadius:'50%',marginTop:'80px'}}></View>
      </View>
      
      <View style={{ width: '100%', height: '350px', backgroundColor: 'rgba(57,33,21,1)',backgroundImage:'url(' + require('@/assets/png/little.png') + ')',backgroundSize:'cover'}} >
       
        <View style={{ width: '100%', height: '100px',paddingTop:'300px' }}><AtButton>
            <Text style={{ fontSize: '20px', color: '#fff' }}>开始点单</Text>
            </AtButton></View>
      </View>
    </Page>
  )
}

export default pagesDiandan