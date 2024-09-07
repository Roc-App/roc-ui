/** constant/dateConstant.js
 * 时间常量枚举池
 * 可以根据文件对枚举所属的模块进行拆分
 * 此文件主要是收集模块常量然后统一暴露出去
 */

const dateConstant = {}

dateConstant.YY = 'YYYY';
dateConstant.YY_MM = 'YYYY-MM';
dateConstant.YY_MM_DD = 'YYYY-MM-DD';
dateConstant.YY_MM_DD_HH = 'YYYY-MM-DD hh';
dateConstant.YY_MM_DD_HH_MM = 'YYYY-MM-DD hh:mm';
dateConstant.YY_MM_DD_HH_MM_SS = 'YYYY-MM-DD hh:mm:ss';


export default dateConstant

