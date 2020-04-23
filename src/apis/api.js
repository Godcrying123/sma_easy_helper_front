import axios from 'axios'
import config from '@/libs/config'

axios.defaults.withCredentials = true

const apiBase = `${config.apiBase}`

console.log(apiBase)

export const clusterList = () => {
  return axios.request({
    method: 'get',
    url: apiBase + 'clusters'
  })
}

export const operationList = () => {
  return axios.request({
    method: 'get',
    url: apiBase + 'operations'
  })
}

export const initClusterRead = () => {
  return axios.request({
    method: 'get',
    url: apiBase + 'init/cluster/read'
  })
}

export const initOperationRead = () => {
  return axios.request({
    method: 'get',
    url: apiBase + 'init/operation/read'
  })
}

export const initClusterDataWrite = (clusterEntity) => {
  return axios.request({
    method: 'post',
    url: apiBase + 'init/cluster/write',
    data: JSON.stringify(clusterEntity)
  })
}

export const initOperationDataWrite = (operationEntity) => {
  return axios.request({
    method: 'post',
    url: apiBase + 'init/operation/write',
    data: JSON.stringify(operationEntity)
  })
}

export const clusterSelectByName = (clusterName) => {
  return axios.request({
    method: 'get',
    url: apiBase + 'clusters/' + clusterName
  })
}

export const operationSelectByName = (operationName) => {
  return axios.request({
    method: 'get',
    url: apiBase + 'operations/' + operationName
  })
}

export const sshMachineInit = (machineEntity) => {
  return axios.request({
    method: 'post',
    url: apiBase + 'init/ssh',
    data: machineEntity
  })
}

export const fileDirList = (FilePath) => {
  return axios.request({
    method: 'get',
    url: apiBase + 'files/list?dir=' + FilePath
  })
}

export const fileRead = (FilePath) => {
  return axios.request({
    method: 'get',
    url: apiBase + 'files/read?path=' + FilePath
  })
}

export const filewrite = (FilePath, FileContent) => {
  return axios.request({
    method: 'post',
    url: apiBase + 'files/write?path=' + FilePath,
    data: FileContent
  })
}
