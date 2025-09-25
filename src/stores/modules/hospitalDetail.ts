import { defineStore } from 'pinia'
import { reqHospitalDetail, reqHospitalDeparment } from '@/api/hospital'
import type {
  HosPitalDetail,
  HospitalDetail,
  DeparmentResponseData,
  DeparmentArr,
} from '@/api/hospital/type'
import type { DetailState } from './interface'
const UseDetailStore = defineStore('Detail', {
  state: (): DetailState => ({
    hospitalInfo: {} as HosPitalDetail,
    deparmentArr: [] as DeparmentArr,
  }),
  actions: {
    async getHospitalDetail(hoscode: string) {
      const res: HospitalDetail = await reqHospitalDetail(hoscode)
      if (res.code === 200) {
        this.hospitalInfo = res.data
      }
    },
    async getDeparment(hoscode: string) {
      const res: DeparmentResponseData = await reqHospitalDeparment(hoscode)
      if (res.code === 200) {
        this.deparmentArr = res.data
      }
    },
  },
})
export default UseDetailStore
