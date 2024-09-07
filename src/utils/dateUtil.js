//时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
import dateConstant from "../store/constant/dateConstant";

export function dateStrFormat(str, time) {
  var date;
  if (time === undefined) {
    date =  new Date();
  } else {
    date = new Date(time);
  }
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  var result;
  // 拼接
  switch(str) {
    case dateConstant.YY:
      result = year
      break;
    case dateConstant.YY_MM:
      result = year+"-"+month
      break;
    case dateConstant.YY_MM_DD:
      result = year+"-"+month+"-"+day
      break;
    case dateConstant.YY_MM_DD_HH:
      result = year+"-"+month+"-"+day+" "+hours
      break;
    case dateConstant.YY_MM_DD_HH_MM:
      result = year+"-"+month+"-"+day+" "+hours+":"+minutes
      break;
    case dateConstant.YY_MM_DD_HH_MM_SS:
      result = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
      break;
    default:
      result = year+"-"+month+"-"+day
      break;
  }
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}
