// import { Page } from '@/components/Page'
// import { View, Text, Input, Picker } from '@tarojs/components'
// import { AtButton, AtInput, AtTextarea, AtList, AtListItem, AtTag, AtDivider, AtCard, AtIcon } from 'taro-ui'
// import Taro from '@tarojs/taro'
// import React, { useState } from 'react'

// const pagesOrder = () => {
//   // 表单状态管理
//   const [formData, setFormData] = useState({
//     patientName: '',
//     phone: '',
//     idCard: '',
//     appointmentDate: '',
//     appointmentTime: '',
//     doctorId: '',
//     departmentType: 0, // 0:妇科, 1:产科
//     notes: ''
//   })

//   // 医生列表数据
//   const doctors = {
//     obstetrics: [ // 产科
//       { id: '001', name: '李主任', title: '主任医师', specialty: '高危妊娠、产前诊断', available: true, fee: 50 },
//       { id: '002', name: '王医生', title: '副主任医师', specialty: '孕期保健、自然分娩', available: true, fee: 35 },
//       { id: '003', name: '张医生', title: '主治医师', specialty: '产后康复、母乳指导', available: false, fee: 25 }
//     ],
//     gynecology: [ // 妇科
//       { id: '004', name: '陈主任', title: '主任医师', specialty: '妇科肿瘤、内分泌疾病', available: true, fee: 50 },
//       { id: '005', name: '刘医生', title: '副主任医师', specialty: '不孕不育、妇科炎症', available: true, fee: 35 },
//       { id: '006', name: '赵医生', title: '主治医师', specialty: '月经不调、子宫疾病', available: true, fee: 25 }
//     ]
//   }

//   // 时间段选择
//   const timeSlots = [
//     { label: '08:00-08:30', value: '08:00-08:30', available: true },
//     { label: '08:30-09:00', value: '08:30-09:00', available: true },
//     { label: '09:00-09:30', value: '09:00-09:30', available: false },
//     { label: '09:30-10:00', value: '09:30-10:00', available: true },
//     { label: '10:00-10:30', value: '10:00-10:30', available: true },
//     { label: '14:00-14:30', value: '14:00-14:30', available: true },
//     { label: '14:30-15:00', value: '14:30-15:00', available: true },
//     { label: '15:00-15:30', value: '15:00-15:30', available: false },
//     { label: '15:30-16:00', value: '15:30-16:00', available: true },
//     { label: '16:00-16:30', value: '16:00-16:30', available: true }
//   ]

//   const departmentTypes = ['产科', '妇科']
  
//   // 获取当前日期，用于日期选择器
//   const getCurrentDate = () => {
//     const now = new Date()
//     const year = now.getFullYear()
//     const month = String(now.getMonth() + 1).padStart(2, '0')
//     const day = String(now.getDate()).padStart(2, '0')
//     return `${year}-${month}-${day}`
//   }

//   // 获取当前科室的医生列表
//   const getCurrentDoctors = () => {
//     return formData.departmentType === 0 ? doctors.obstetrics : doctors.gynecology
//   }

//   // 获取选中医生的信息
//   const getSelectedDoctor = () => {
//     const allDoctors = [...doctors.obstetrics, ...doctors.gynecology]
//     return allDoctors.find(doc => doc.id === formData.doctorId)
//   }

//   // 表单项更新
//   const updateFormData = (key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: value
//     }))
//   }

//   // 科室选择变化
//   const handleDepartmentChange = (e) => {
//     const index = e.detail.value
//     setFormData(prev => ({
//       ...prev,
//       departmentType: index,
//       doctorId: '' // 清空医生选择
//     }))
//   }

//   // 日期选择变化
//   const handleDateChange = (e) => {
//     updateFormData('appointmentDate', e.detail.value)
//   }

//   // 医生选择
//   const handleDoctorSelect = (doctorId) => {
//     updateFormData('doctorId', doctorId)
//   }

//   // 时间段选择
//   const handleTimeSelect = (timeValue) => {
//     updateFormData('appointmentTime', timeValue)
//   }

//   // 表单验证
//   const validateForm = () => {
//     if (!formData.patientName.trim()) {
//       Taro.showToast({ title: '请输入患者姓名', icon: 'none' })
//       return false
//     }
//     if (!formData.phone.trim() || !/^1[3-9]\d{9}$/.test(formData.phone)) {
//       Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
//       return false
//     }
//     if (!formData.idCard.trim()) {
//       Taro.showToast({ title: '请输入身份证号', icon: 'none' })
//       return false
//     }
//     if (!formData.appointmentDate) {
//       Taro.showToast({ title: '请选择预约日期', icon: 'none' })
//       return false
//     }
//     if (!formData.doctorId) {
//       Taro.showToast({ title: '请选择预约医生', icon: 'none' })
//       return false
//     }
//     if (!formData.appointmentTime) {
//       Taro.showToast({ title: '请选择预约时间', icon: 'none' })
//       return false
//     }
//     return true
//   }

//   // 提交预约
//   const handleSubmit = () => {
//     Taro.navigateTo({
//       url: '/pages/orderSuccess/index'
//     })
//   }

//   return (
//     <Page>
//       <View style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        
//         {/* 页面标题 */}
//         <View style={{ 
//           textAlign: 'center', 
//           fontSize: '20px', 
//           fontWeight: 'bold', 
//           color: '#333',
//           marginBottom: '20px',
//           padding: '15px',
//           backgroundColor: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//         }}>
//           <AtIcon value='heart' size='24' color='#ff6b6b' />
//           <Text style={{ marginLeft: '10px' }}>妇产科预约挂号</Text>
//         </View>

//         {/* 医院信息卡片 */}
//         <AtCard
//           title='上海复旦大学附属妇产科医院'
//           extra='三甲医院'
//           thumb='https://img.tukuppt.com/png_preview/00/34/04/rZB8MHFyPG.jpg!/fw/780'
//         >
//           <View style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
//             <View>地址：上海市浦东新区张江高科技园区</View>
//             <View>电话：86-21-62330870</View>
//             <View>科室简介：拥有资深专家团队，专业提供孕产期保健、妇科疾病诊疗等服务</View>
//           </View>
//         </AtCard>

//         <AtDivider content='预约信息' fontColor='#333' lineColor='#ddd' />

//         {/* 患者信息 */}
//         <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//           <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//             患者信息
//           </Text>
          
//           <AtInput
//             name='patientName'
//             title='患者姓名'
//             type='text'
//             placeholder='请输入患者真实姓名'
//             value={formData.patientName}
//             onChange={(value) => updateFormData('patientName', value)}
//             required
//           />
          
//           <AtInput
//             name='phone'
//             title='手机号码'
//             type='phone'
//             placeholder='请输入11位手机号码'
//             value={formData.phone}
//             onChange={(value) => updateFormData('phone', value)}
//             required
//           />
          
//           <AtInput
//             name='idCard'
//             title='身份证号'
//             type='text'
//             placeholder='请输入18位身份证号码'
//             value={formData.idCard}
//             onChange={(value) => updateFormData('idCard', value)}
//             required
//           />
//         </View>

//         {/* 预约科室选择 */}
//         <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//           <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//             选择科室
//           </Text>
          
//           <Picker
//             mode='selector'
//             range={departmentTypes}
//             value={formData.departmentType}
//             onChange={handleDepartmentChange}
//           >
//             <AtListItem
//               title='预约科室'
//               extraText={departmentTypes[formData.departmentType]}
//               arrow='right'
//             />
//           </Picker>
//         </View>

//         {/* 预约日期 */}
//         <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//           <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//             选择日期
//           </Text>
          
//           <Picker
//             mode='date'
//             value={formData.appointmentDate}
//             start={getCurrentDate()}
//             onChange={handleDateChange}
//           >
//             <AtListItem
//               title='预约日期'
//               extraText={formData.appointmentDate || '请选择日期'}
//               arrow='right'
//             />
//           </Picker>
//         </View>

//         {/* 医生选择 */}
//         <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//           <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//             选择医生
//           </Text>
          
//           {getCurrentDoctors().map(doctor => (
//             <View 
//               key={doctor.id}
//               style={{
//                 border: formData.doctorId === doctor.id ? '2px solid #6190e8' : '1px solid #eee',
//                 borderRadius: '8px',
//                 padding: '15px',
//                 marginBottom: '10px',
//                 backgroundColor: formData.doctorId === doctor.id ? '#f0f4ff' : '#fff',
//                 opacity: doctor.available ? 1 : 0.5
//               }}
//               onClick={() => doctor.available && handleDoctorSelect(doctor.id)}
//             >
//               <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <View>
//                   <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
//                     {doctor.name} {doctor.title}
//                   </Text>
//                   <Text style={{ fontSize: '14px', color: '#666', marginTop: '5px', display: 'block' }}>
//                     擅长：{doctor.specialty}
//                   </Text>
//                 </View>
//                 <View style={{ textAlign: 'right' }}>
//                   <AtTag 
//                     size='small' 
//                     type={doctor.available ? 'primary' : 'tertiary'}
//                     circle
//                   >
//                     {doctor.available ? '可预约' : '已满'}
//                   </AtTag>
//                   <Text style={{ fontSize: '14px', color: '#ff6b6b', fontWeight: 'bold', marginTop: '5px', display: 'block' }}>
//                     ¥{doctor.fee}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* 时间段选择 */}
//         {formData.doctorId && (
//           <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//             <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//               选择时间段
//             </Text>
            
//             <View style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//               {timeSlots.map(slot => (
//                 <View
//                   key={slot.value}
//                   style={{
//                     padding: '10px 15px',
//                     border: formData.appointmentTime === slot.value ? '2px solid #6190e8' : '1px solid #ddd',
//                     borderRadius: '5px',
//                     backgroundColor: !slot.available ? '#f5f5f5' : 
//                                    formData.appointmentTime === slot.value ? '#e3f2fd' : '#fff',
//                     opacity: slot.available ? 1 : 0.5,
//                     cursor: slot.available ? 'pointer' : 'not-allowed'
//                   }}
//                   onClick={() => slot.available && handleTimeSelect(slot.value)}
//                 >
//                   <Text style={{ 
//                     fontSize: '14px', 
//                     color: !slot.available ? '#999' : 
//                            formData.appointmentTime === slot.value ? '#1976d2' : '#333'
//                   }}>
//                     {slot.label}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* 备注信息 */}
//         <View style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '15px' }}>
//           <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
//             备注说明
//           </Text>
          
//           <AtTextarea
//             value={formData.notes}
//             onChange={(value) => updateFormData('notes', value)}
//             maxLength={200}
//             placeholder='请输入特殊说明或症状描述（选填）'
//             height={100}
//           />
//         </View>

//         {/* 预约须知 */}
//         <View style={{ backgroundColor: '#fff3cd', borderRadius: '10px', padding: '15px', marginBottom: '20px', border: '1px solid #ffeaa7' }}>
//           <Text style={{ fontSize: '14px', color: '#856404', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
//             <AtIcon value='alert-circle' size='16' color='#856404' />
//             预约须知
//           </Text>
//           <View style={{ fontSize: '12px', color: '#856404', lineHeight: '1.6' }}>
//             <View>1. 请提前30分钟到达医院取号</View>
//             <View>2. 预约成功后请按时就诊，过时作废</View>
//             <View>3. 如需取消预约，请提前4小时操作</View>
//             <View>4. 就诊时请携带身份证和相关检查资料</View>
//             <View>5. 咨询电话：010-69156114</View>
//           </View>
//         </View>

//         {/* 费用预览 */}
//         {getSelectedDoctor() && (
//           <View style={{ backgroundColor: '#e8f5e8', borderRadius: '10px', padding: '15px', marginBottom: '20px', border: '1px solid #c3e6cb' }}>
//             <Text style={{ fontSize: '14px', color: '#155724', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
//               费用预览
//             </Text>
//             <View style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Text style={{ fontSize: '14px', color: '#155724' }}>挂号费：</Text>
//               <Text style={{ fontSize: '14px', color: '#155724', fontWeight: 'bold' }}>¥{getSelectedDoctor().fee}</Text>
//             </View>
//           </View>
//         )}

//         {/* 提交按钮 */}
//         <AtButton 
//           type='primary' 
//           size='large'
//           onClick={handleSubmit}
//           style={{ 
//             backgroundColor: '#6190e8', 
//             borderColor: '#6190e8',
//             borderRadius: '10px',
//             fontWeight: 'bold'
//           }}
//         >
//           确认预约
//         </AtButton>
//       </View>
//     </Page>
//   )
// }

// export default pagesOrder