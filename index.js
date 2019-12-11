const request = require('request');// 引入request插件
const fs = require('fs');// 引入fs模块，用来读取文件并写入
const path = require('path');
const excelPort = require('excel-export');
function write(data = []){
    let len = data.length;
    //定义一个对象，存放内容
    let conf = {
        //定义表头
        cols : [
            {caption:'名字', type:'string', width: 60},// name
            {caption:'手机号', type:'string', width: 60},// mobile
            {caption:'验证码', type:'string', width: 60},// verificationCode
            {caption:'公司', type:'string', width: 60},// company
            {caption:'职位', type:'string', width: 60},// position
            {caption:'城市', type:'string', width: 60},// city
            {caption:'意向信息', type:'string', width: 60},// demand
            {caption:'补充信息', type:'string', width: 60},// extraInfo
            {caption:'设备信息', type:'string', width: 60},// equipment
            {caption:'注册日期', type:'string', width: 60}// time
        ],
        // 表格内容
        rows: []
    };
    // 循环导入从数据库中获取的表内容
    for (let i = 0; i < len; i++){
        //依次写入
        conf.rows[i] = [
            data[i].name || '',
            data[i].mobile || '',
            data[i].verificationCode || '',
            data[i].company || '',
            data[i].position || '',
            data[i].city || '',
            data[i].demand || '',
            data[i].extraInfo || '',
            data[i].equipment || '',
            (new Date(data[i].time)).toLocaleDateString() || '',
        ];
    }
    //生成表格
    let result = excelPort.execute(conf);
    // 定义表格存放路径
    fs.writeFile('static/util.xlsx', result, 'binary',function(err){
        if(err){
            console.log(err);
        }
        console.log('导入完成')
    });
}
write();


