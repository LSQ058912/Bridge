// import { Page } from '@/components/Page'
// import { View, Text, Image } from '@tarojs/components'
// import { AtButton, AtIcon, AtTag, AtAvatar } from 'taro-ui'
// import Taro from '@tarojs/taro'
// import React, { useState } from 'react'


// const AppointmentSuccessPage = () => {
//   // 预约成功数据
//   const [appointmentData] = useState({
//     // 预约基础信息
//     orderNo: 'YY20250828001',
//     status: '已确认',
//     appointmentTime: '2025-08-30 09:00-09:30',
    
//     // 医生信息
//     doctor: {
//       id: '1103********77',
//       name: '吴琴姣',
//       title: '副主任医师',
//       department: '妇产科/妇科',
//       subDepartment: '妇科',
//       hospital: '复旦大学附属妇产科医院',
//       avatar: 'https://kano.guahao.com/N8x14361641_image140.jpg?timestamp=1596001043136',
//       specialty: '不孕不育、月经失调、妇科炎症、子宫肌瘤、卵巢囊肿、宫颈炎等疾病治疗',
//       experience: '从医20年',
//       education: '硕士',
//       consultationFee: 280,
//       rating: 4.9,
//       patientCount: '8000+'
//     },
    
//     // 预约人信息
//     patient: {
//       name: '姚昕',
//       gender: '女',
//       age: 25,
//       phone: '138****3037',
//       idCard: '342901********2828',
//       medicalCardNo: 'MC2025001234',
//       emergencyContact: {
//         name: '王女士',
//         relation: '家属',
//         phone: '139****5678'
//       }
//     },
    
//     // 就诊信息
//     visit: {
//       date: '2025年8月30日',
//       time: '上午 11:00-11:30',
//       location: '门诊楼3楼 妇科诊室3',
//       queueNumber: 'A08',
//       estimatedWait: '约20分钟',
//       visitType: '门诊'
//     }
//   })

//   // 拨打医院电话
//   const callHospital = () => {
//     Taro.makePhoneCall({
//       phoneNumber: '01069156114'
//     })
//   }

//   // 复制预约单号
//   const copyOrderNo = () => {
//     Taro.setClipboardData({
//       data: appointmentData.orderNo,
//       success: () => {
//         Taro.showToast({
//           title: '预约单号已复制',
//           icon: 'success'
//         })
//       }
//     })
//   }

//   // 查看医生详细资料
//   const viewDoctorProfile = () => {
//     Taro.navigateTo({
//       url: `/pages/doctorDetail/index?doctorId=${appointmentData.doctor.id}`
//     })
//   }

//   // 修改预约人信息
//   const editPatientInfo = () => {
//     Taro.navigateTo({
//       url: `/pages/editPatient/index?orderNo=${appointmentData.orderNo}`
//     })
//   }

//   // 取消预约
//   const cancelAppointment = () => {
//     Taro.showModal({
//       title: '确认取消预约',
//       content: '取消后需要重新预约，确定要取消吗？',
//       success: (res) => {
//         if (res.confirm) {
//           Taro.showToast({
//             title: '预约已取消',
//             icon: 'success'
//           })
//         }
//       }
//     })
//   }

//   return (
//     <Page>
//       <View style={{
//         minHeight: '100vh',
//         backgroundColor: '#f8f9fa'
//       }}>
        
//         {/* 成功状态头部 */}
//         <View style={{
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           padding: '40px 20px 30px',
//           textAlign: 'center',
//           color: '#fff',
//           position: 'relative'
//         }}>
//           {/* 装饰背景 */}
//           <View style={{
//             position: 'absolute',
//             top: '10px',
//             right: '20px',
//             width: '100px',
//             height: '100px',
//             borderRadius: '50%',
//             backgroundColor: 'rgba(255,255,255,0.1)'
//           }} />
          
//           <View style={{
//             width: '70px',
//             height: '70px',
//             borderRadius: '50%',
//             backgroundColor: '#fff',
//             margin: '0 auto 20px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
//           }}>
//             <AtIcon value='check' size='35' color='#52c41a' />
//           </View>
          
//           <Text style={{
//             fontSize: '24px',
//             fontWeight: 'bold',
//             marginBottom: '8px'
//           }}>
//             预约成功
//           </Text>
          
//           <Text style={{
//             fontSize: '16px',
//             opacity: 0.9
//           }}>
//             预约单号：{appointmentData.orderNo}
//           </Text>
          
//           <View 
//             style={{
//               marginTop: '10px',
//               display: 'inline-flex',
//               alignItems: 'center',
//               backgroundColor: 'rgba(255,255,255,0.2)',
//               borderRadius: '15px',
//               padding: '5px 12px'
//             }}
//             onClick={copyOrderNo}
//           >
//             <AtIcon value='copy' size='14' color='#fff' />
//             <Text style={{ fontSize: '12px', marginLeft: '5px' }}>点击复制</Text>
//           </View>
//         </View>

//         {/* 医生信息卡片 */}
//         <View style={{
//           backgroundColor: '#fff',
//           margin: '20px',
//           borderRadius: '12px',
//           padding: '20px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//         }}>
//           <View style={{
//             display: 'flex',
//             alignItems: 'center',
//             marginBottom: '15px'
//           }}>
//             <AtIcon value='user' size='18' color='#1890ff' />
//             <Text style={{
//               fontSize: '16px',
//               fontWeight: 'bold',
//               color: '#333',
//               marginLeft: '8px'
//             }}>
//               医生信息
//             </Text>
//           </View>
          
//           <View style={{
//             display: 'flex',
//             alignItems: 'flex-start'
//           }} onClick={viewDoctorProfile}>
//             {/* 医生头像 */}
//             <View style={{
//               width: '80px',
//               height: '80px',
//               borderRadius: '50%',
//               backgroundColor: '#f0f8ff',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginRight: '15px',
//               overflow: 'hidden'
//             }}>
//               <AtIcon value='user' size='32' color='#1890ff' />
//             </View>
            
//             {/* 医生详细信息 */}
//             <View style={{ flex: 1 }}>
//               <View style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//                 <View style={{
//                   fontSize: '20px',
//                   fontWeight: 'bold',
//                   color: '#333',
//                   marginRight: '10px'
//                 }}>
//                   {appointmentData.doctor.name}
//                 </View>
//                 <AtTag size='small' type='primary'>
//                   {appointmentData.doctor.title}
//                 </AtTag>
//               </View>
              
//               <View style={{
//                 fontSize: '14px',
//                 color: '#666',
//                 marginBottom: '5px'
//               }}>
//                 {appointmentData.doctor.hospital} · {appointmentData.doctor.department}
//               </View>
              
//               <View style={{
//                 fontSize: '14px',
//                 color: '#666',
//                 marginBottom: '5px'
//               }}>
//                 {appointmentData.doctor.education} · {appointmentData.doctor.experience}
//               </View>
              
//               <View style={{
//                 fontSize: '13px',
//                 color: '#999',
//                 marginBottom: '8px',
//                 lineHeight: '1.4'
//               }}>
//                 擅长：{appointmentData.doctor.specialty}
//               </View>
              
//               <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <View style={{ display: 'flex', alignItems: 'center' }}>
//                   <AtIcon value='star' size='14' color='#fadb14' />
//                   <View style={{ fontSize: '13px', color: '#666', marginLeft: '4px' }}>
//                     {appointmentData.doctor.rating} ({appointmentData.doctor.patientCount}患者)
//                   </View>
//                 </View>
//                 <View style={{
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   color: '#f5222d'
//                 }}>
//                   ¥{appointmentData.doctor.consultationFee}
//                 </View>
//               </View>
//             </View>
            
//             <AtIcon value='chevron-right' size='16' color='#ccc' />
//           </View>
//         </View>

//         {/* 预约人信息卡片 */}
//         <View style={{
//           backgroundColor: '#fff',
//           margin: '0 20px 20px',
//           borderRadius: '12px',
//           padding: '20px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//         }}>
//           <View style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '15px'
//           }}>
//             <View style={{ display: 'flex', alignItems: 'center' }}>
//               <AtIcon value='user-check' size='18' color='#52c41a' />
//               < View style={{
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#333',
//                 marginLeft: '8px'
//               }}>
//                 预约人信息
//               </View>
//             </View>
//             <View 
//               style={{ fontSize: '14px', color: '#1890ff' }}
//               onClick={editPatientInfo}
//             >
//               修改
//             </View>
//           </View>
          
//           <View style={{
//             backgroundColor: '#fafafa',
//             borderRadius: '8px',
//             padding: '15px'
//           }}>
//             <View style={{ display: 'flex', marginBottom: '12px' }}>
//               <View style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//                 患者姓名：
//               </View>
//               <View style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
//                 {appointmentData.patient.name}
//               </View>
//               <View style={{
//                 backgroundColor: appointmentData.patient.gender === '女' ? '#ff85c0' : '#1890ff',
//                 borderRadius: '10px',
//                 padding: '2px 8px',
//                 marginLeft: '10px'
//               }}>
//                 <View style={{ fontSize: '12px', color: '#fff' }}>
//                   {appointmentData.patient.gender}
//                 </View>
//               </View>
//             </View>
            
//             <View style={{ display: 'flex', marginBottom: '12px' }}>
//               <View style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//                 年龄：
//               </View>
//               <View style={{ fontSize: '14px', color: '#333' }}>
//                 {appointmentData.patient.age}岁
//               </View>
//             </View>
            
//             <View style={{ display: 'flex', marginBottom: '12px' }}>
//               <View style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//                 联系电话：
//               </View>
//               <View style={{ fontSize: '14px', color: '#333' }}>
//                 {appointmentData.patient.phone}
//               </View>
//             </View>
            
//             <View style={{ display: 'flex', marginBottom: '12px' }}>
//               <View style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//                 身份证号：
//               </View>
//               <View style={{ fontSize: '14px', color: '#333' }}>
//                 {appointmentData.patient.idCard}
//               </View>
//             </View>
            
//             <View style={{ display: 'flex', marginBottom: '12px' }}>
//               <View style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//                 就诊卡号：
//               </View>
//               <View style={{ fontSize: '14px', color: '#333' }}>
//                 {appointmentData.patient.medicalCardNo}
//               </View>
//             </View>
            
//             <View style={{ 
//               borderTop: '1px solid #e8e8e8',
//               paddingTop: '12px',
//               marginTop: '12px'
//             }}>
//               <View style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>
//                 紧急联系人：
//               </View>
//               <View style={{ fontSize: '14px', color: '#666' }}>
//                 {appointmentData.patient.emergencyContact.name} 
//                 ({appointmentData.patient.emergencyContact.relation}) 
//                 {appointmentData.patient.emergencyContact.phone}
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* 就诊信息 */}
//         <View style={{
//           backgroundColor: '#fff',
//           margin: '0 20px 20px',
//           borderRadius: '12px',
//           padding: '20px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//         }}>
//           <View style={{
//             display: 'flex',
//             alignItems: 'center',
//             marginBottom: '15px'
//           }}>
//             <AtIcon value='calendar' size='18' color='#fa8c16' />
//             <Text style={{
//               fontSize: '16px',
//               fontWeight: 'bold',
//               color: '#333',
//               marginLeft: '8px'
//             }}>
//               就诊安排
//             </Text>
//           </View>
          
//           <View style={{ display: 'flex', marginBottom: '12px' }}>
//             <Text style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//               就诊日期：
//             </Text>
//             <Text style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>
//               {appointmentData.visit.date}
//             </Text>
//           </View>
          
//           <View style={{ display: 'flex', marginBottom: '12px' }}>
//             <Text style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//               就诊时间：
//             </Text>
//             <Text style={{ fontSize: '14px', color: '#1890ff', fontWeight: 'bold' }}>
//               {appointmentData.visit.time}
//             </Text>
//           </View>
          
//           <View style={{ display: 'flex', marginBottom: '12px' }}>
//             <Text style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//               就诊地点：
//             </Text>
//             <Text style={{ fontSize: '14px', color: '#333' }}>
//               {appointmentData.visit.location}
//             </Text>
//           </View>
          
//           <View style={{ display: 'flex', marginBottom: '12px' }}>
//             <Text style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//               排队号码：
//             </Text>
//             <View style={{ display: 'flex', alignItems: 'center' }}>
//               <Text style={{ fontSize: '14px', color: '#f5222d', fontWeight: 'bold' }}>
//                 {appointmentData.visit.queueNumber}
//               </Text>
//               <Text style={{ fontSize: '12px', color: '#999', marginLeft: '10px' }}>
//                 {appointmentData.visit.estimatedWait}
//               </Text>
//             </View>
//           </View>
          
//           <View style={{ display: 'flex' }}>
//             <Text style={{ width: '80px', fontSize: '14px', color: '#666' }}>
//               就诊类型：
//             </Text>
//             <AtTag size='small' type='primary'>
//               {appointmentData.visit.visitType}
//             </AtTag>
//           </View>
//         </View>

//         {/* 温馨提示 */}
//         <View style={{
//           backgroundColor: '#fff2e8',
//           margin: '0 20px 30px',
//           borderRadius: '8px',
//           padding: '15px',
//           border: '1px solid #ffe7ba'
//         }}>
//           <View style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <AtIcon value='alert-circle' size='16' color='#fa8c16' />
//             <Text style={{
//               fontSize: '14px',
//               fontWeight: 'bold',
//               color: '#d46b08',
//               marginLeft: '5px'
//             }}>
//               就诊提醒
//             </Text>
//           </View>
//           <Text style={{
//             fontSize: '13px',
//             color: '#d46b08',
//             lineHeight: '1.6'
//           }}>
//             • 请提前30分钟到达医院办理取号手续{'\n'}
//             • 携带本人身份证、就诊卡及相关检查资料{'\n'}
//             • 孕期就诊建议家属陪同{'\n'}
//             • 如需改期请提前24小时联系医院
//           </Text>
//         </View>

//         {/* 底部操作按钮 */}
//         <View style={{
//           padding: '0 20px 30px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           <View style={{ display: 'flex', gap: '12px' }}>
//             <AtButton 
//               size='large'
//               onClick={callHospital}
//               style={{
//                 flex: 1,
//                 backgroundColor: '#52c41a',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '8px'
//               }}
//             >
//               <AtIcon value='phone' size='16' color='#fff' />
//               <Text style={{ marginLeft: '5px' }}>联系医院</Text>
//             </AtButton>
            
//             <AtButton 
//               size='large'
//               onClick={cancelAppointment}
//               style={{
//                 flex: 1,
//                 backgroundColor: '#fff',
//                 color: '#ff4d4f',
//                 border: '1px solid #ff4d4f',
//                 borderRadius: '8px'
//               }}
//             >
//               取消预约
//             </AtButton>
//           </View>
          
//           <AtButton 
//             type='primary'
//             size='large'
//             onClick={() => Taro.switchTab({ url: '/pages/index/index' })}
//             style={{
//               backgroundColor: '#1890ff',
//               borderRadius: '8px',
//               fontWeight: 'bold'
//             }}
//           >
//             返回首页
//           </AtButton>
//         </View>
//       </View>
//     </Page>
//   )
// }

// export default AppointmentSuccessPage