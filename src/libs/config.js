let config = {}

config.wsBase = `$(window.location.protocol === "https:" ? "wss://" : "ws://" )${window.location.host}`
config.apiBase = `${window.location.protocol}//:${window.location.host}`

if (window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1')) {
  // to fix nginx web socket upgrade error
  config.wsBase = 'ws://' + window.location.host
  // config.wsBase = 'ws://localhost:8080'
  config.apiBase = 'http://' + window.location.host + '/api/v1/'
  // config.apiBase = 'http://localhost:8080/api/v1/'
}

export default config
