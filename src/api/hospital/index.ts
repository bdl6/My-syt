import request from '@/utils/request'
import type {
  HospitalDetail,
  DeparmentResponseData,
  UserLoginResponseData,
  LoginData,
  WXLoginResponseData,
  HospitalWordData,
  DoctorResponseData,
} from '@/api/hospital/type'
enum API {
  //获取某一个医院的详情的数据
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  //获取某一个医院的科室的数据
  HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
  //获取验证码接口
  GETUSERCODE_URL = '/sms/send/',
  //用户登录接口
  USERLOGIN_URL = '/user/login',
  //获取微信扫码登录需要参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  //获取某一个医院的某一个科室预约挂号数据
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  //获取医院某一个科室某一天相应医生排班的数据
  HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  //获取某一个账号下就诊人的信息
  GETUSER_URL = '/user/patient/auth/findAll',
}
export const reqHospitalDetail = (hoscode: string) =>
  request.get<unknown, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode)
//获取医院科室的接口
export const reqHospitalDeparment = (hoscode: string) =>
  request.get<unknown, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode)
//获取验证码接口
export const reqCode = (phone: string) => request.get<unknown, unknown>(API.GETUSERCODE_URL + phone)
//用户登录接口
export const reqUserLogin = (data: LoginData) =>
  request.post<unknown, UserLoginResponseData>(API.USERLOGIN_URL, data)
export const reqWXLogin = (wxRedirectUri: string) =>
  request.get<unknown, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) =>
  request.get<unknown, HospitalWordData>(
    API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`,
  )
//获取医生排班的数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) =>
  request.get<unknown, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`,
  )
//获取某一个账号下就诊人信息
export const reqGetUser = () => request.get(API.GETUSER_URL)
