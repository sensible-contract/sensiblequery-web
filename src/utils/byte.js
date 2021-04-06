/**
 * @param {Number} a
 * @param {Number} b
 * @returns {String}
 */
export function formatBytes (a,b=2) {
  if(0===a)return"0 B";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
  return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
}
